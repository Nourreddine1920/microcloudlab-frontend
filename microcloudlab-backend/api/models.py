from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

def default_dict():
    return {}

def default_list():
    return []

class Microcontroller(models.Model):
    """Model for different types of microcontrollers available in the platform"""
    MICROCONTROLLER_TYPES = [
        ('ESP32', 'ESP32'),
        ('ESP8266', 'ESP8266'),
        ('ARDUINO_UNO', 'Arduino Uno'),
        ('ARDUINO_NANO', 'Arduino Nano'),
        ('RASPBERRY_PI_PICO', 'Raspberry Pi Pico'),
        ('STM32', 'STM32'),
        ('PIC', 'PIC'),
        ('AVR', 'AVR'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50, choices=MICROCONTROLLER_TYPES)
    description = models.TextField()
    specifications = models.JSONField(default=default_dict, blank=True, null=True)  # RAM, Flash, GPIO pins, etc.
    is_available = models.BooleanField(default=True)
    is_deletable = models.BooleanField(default=True, help_text="Whether this microcontroller can be deleted by admins")
    current_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return f"{self.name} ({self.type})"

class Project(models.Model):
    """Model for user projects"""
    PROJECT_TYPES = [
        ('IOT', 'IoT Project'),
        ('ROBOTICS', 'Robotics'),
        ('SENSOR', 'Sensor Project'),
        ('LED_CONTROL', 'LED Control'),
        ('MOTOR_CONTROL', 'Motor Control'),
        ('COMMUNICATION', 'Communication'),
        ('EDUCATION', 'Educational'),
        ('RESEARCH', 'Research'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    description = models.TextField()
    project_type = models.CharField(max_length=50, choices=PROJECT_TYPES)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_projects')
    collaborators = models.ManyToManyField(User, related_name='collaborated_projects', blank=True)
    microcontroller = models.ForeignKey(Microcontroller, on_delete=models.SET_NULL, null=True, blank=True)
    code_content = models.TextField(blank=True)
    is_public = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-updated_at']
    
    def __str__(self):
        return self.title

class CodeExecution(models.Model):
    """Model for tracking code executions and deployments"""
    EXECUTION_STATUS = [
        ('PENDING', 'Pending'),
        ('RUNNING', 'Running'),
        ('SUCCESS', 'Success'),
        ('FAILED', 'Failed'),
        ('TIMEOUT', 'Timeout'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code_content = models.TextField()
    execution_status = models.CharField(max_length=20, choices=EXECUTION_STATUS, default='PENDING')
    output_log = models.TextField(blank=True)
    error_message = models.TextField(blank=True)
    execution_time = models.FloatField(null=True, blank=True)  # in seconds
    memory_usage = models.IntegerField(null=True, blank=True)  # in bytes
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.project.title} - {self.execution_status}"

class UserProfile(models.Model):
    """Extended user profile with additional information"""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    avatar = models.URLField(blank=True)
    github_username = models.CharField(max_length=100, blank=True)
    linkedin_url = models.URLField(blank=True)
    website_url = models.URLField(blank=True)
    experience_level = models.CharField(max_length=20, choices=[
        ('BEGINNER', 'Beginner'),
        ('INTERMEDIATE', 'Intermediate'),
        ('ADVANCED', 'Advanced'),
        ('EXPERT', 'Expert'),
    ], default='BEGINNER')
    preferred_microcontrollers = models.ManyToManyField(Microcontroller, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username}'s Profile"

class Tutorial(models.Model):
    """Model for educational tutorials and guides"""
    DIFFICULTY_LEVELS = [
        ('BEGINNER', 'Beginner'),
        ('INTERMEDIATE', 'Intermediate'),
        ('ADVANCED', 'Advanced'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    description = models.TextField()
    content = models.TextField()
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_LEVELS)
    estimated_time = models.IntegerField(help_text="Estimated time in minutes")
    microcontroller = models.ForeignKey(Microcontroller, on_delete=models.SET_NULL, null=True, blank=True)
    tags = models.JSONField(default=default_list)
    is_published = models.BooleanField(default=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['difficulty', 'title']
    
    def __str__(self):
        return self.title

class TutorialProgress(models.Model):
    """Track user progress through tutorials"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tutorial = models.ForeignKey(Tutorial, on_delete=models.CASCADE)
    is_completed = models.BooleanField(default=False)
    completion_percentage = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        default=0
    )
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        unique_together = ['user', 'tutorial']
    
    def __str__(self):
        return f"{self.user.username} - {self.tutorial.title}"

class CaseStudy(models.Model):
    """Model for case studies and success stories"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300)
    description = models.TextField()
    challenge = models.TextField()
    solution = models.TextField()
    results = models.TextField()
    technologies_used = models.JSONField(default=default_list)
    industry = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100, blank=True)
    image = models.URLField(blank=True, help_text="URL to the case study image")
    company_logo = models.URLField(blank=True, help_text="URL to the company logo")
    roi_percentage = models.FloatField(null=True, blank=True)
    time_saved = models.CharField(max_length=100, blank=True)
    cost_savings = models.CharField(max_length=100, blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Case Studies"
    
    def __str__(self):
        return self.title

class ContactInquiry(models.Model):
    """Model for contact form submissions"""
    INQUIRY_TYPES = [
        ('GENERAL', 'General Inquiry'),
        ('PARTNERSHIP', 'Partnership'),
        ('SUPPORT', 'Technical Support'),
        ('SALES', 'Sales Inquiry'),
        ('FEEDBACK', 'Feedback'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    company = models.CharField(max_length=100, blank=True)
    inquiry_type = models.CharField(max_length=20, choices=INQUIRY_TYPES)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Contact Inquiries"
    
    def __str__(self):
        return f"{self.name} - {self.subject}"

class PlatformStats(models.Model):
    """Model for tracking platform statistics"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateField(unique=True)
    active_users = models.IntegerField(default=0)
    projects_created = models.IntegerField(default=0)
    code_executions = models.IntegerField(default=0)
    tutorials_completed = models.IntegerField(default=0)
    countries_represented = models.IntegerField(default=0)
    uptime_percentage = models.FloatField(default=100.0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-date']
        verbose_name_plural = "Platform Statistics"
    
    def __str__(self):
        return f"Stats for {self.date}"

class TeamMember(models.Model):
    """Model for team member information"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    bio = models.TextField()
    avatar = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'name']
    
    def __str__(self):
        return f"{self.name} - {self.role}"

class Resource(models.Model):
    """Model for educational resources and documentation"""
    RESOURCE_TYPES = [
        ('DOCUMENTATION', 'Documentation'),
        ('VIDEO', 'Video Tutorial'),
        ('BLOG', 'Blog Post'),
        ('WHITEPAPER', 'White Paper'),
        ('WEBINAR', 'Webinar'),
        ('CHEATSHEET', 'Cheat Sheet'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    description = models.TextField()
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    url = models.URLField()
    tags = models.JSONField(default=default_list)
    difficulty_level = models.CharField(max_length=20, choices=[
        ('BEGINNER', 'Beginner'),
        ('INTERMEDIATE', 'Intermediate'),
        ('ADVANCED', 'Advanced'),
    ], blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
