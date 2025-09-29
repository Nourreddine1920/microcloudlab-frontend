from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

def default_dict():
    return {}

def default_list():
    return []


class Microcontroller(models.Model):
    """
    Represents a microcontroller available on the platform.

    Attributes:
        id (UUIDField): The unique identifier for the microcontroller.
        name (CharField): The display name of the microcontroller.
        type (CharField): The type of the microcontroller from a predefined list.
        description (TextField): A detailed description of the microcontroller.
        specifications (JSONField): Technical specifications like RAM, Flash, etc.
        is_available (BooleanField): Whether the microcontroller is currently available for use.
        is_deletable (BooleanField): Whether this instance can be deleted by admins.
        current_user (ForeignKey): The user currently using this microcontroller, if any.
        created_at (DateTimeField): The timestamp when the record was created.
        updated_at (DateTimeField): The timestamp when the record was last updated.
    """
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
    """
    Represents a user's project on the platform.

    Attributes:
        id (UUIDField): The unique identifier for the project.
        title (CharField): The title of the project.
        description (TextField): A detailed description of the project.
        project_type (CharField): The category of the project.
        owner (ForeignKey): The user who owns the project.
        collaborators (ManyToManyField): Users who are collaborating on the project.
        microcontroller (ForeignKey): The microcontroller associated with the project.
        code_content (TextField): The source code of the project.
        is_public (BooleanField): Whether the project is publicly visible.
        is_active (BooleanField): Whether the project is currently active.
        created_at (DateTimeField): The timestamp when the project was created.
        updated_at (DateTimeField): The timestamp when the project was last updated.
    """
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
    """
    Tracks the execution of code on a microcontroller for a specific project.

    Attributes:
        id (UUIDField): The unique identifier for the execution record.
        project (ForeignKey): The project to which this execution belongs.
        user (ForeignKey): The user who initiated the execution.
        code_content (TextField): The snapshot of the code that was executed.
        execution_status (CharField): The status of the execution (e.g., PENDING, RUNNING, SUCCESS, FAILED).
        output_log (TextField): The log output generated during execution.
        error_message (TextField): Any error messages produced during execution.
        execution_time (FloatField): The duration of the execution in seconds.
        memory_usage (IntegerField): The memory used by the execution in bytes.
        created_at (DateTimeField): The timestamp when the execution was initiated.
    """
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
    """
    Extends the default Django User model with additional profile information.

    Attributes:
        user (OneToOneField): A one-to-one link to the Django User model.
        bio (TextField): A short biography of the user.
        avatar (URLField): A URL to the user's avatar image.
        github_username (CharField): The user's GitHub username.
        linkedin_url (URLField): A URL to the user's LinkedIn profile.
        website_url (URLField): A URL to the user's personal website.
        experience_level (CharField): The user's self-reported experience level.
        preferred_microcontrollers (ManyToManyField): A list of the user's favorite microcontrollers.
        created_at (DateTimeField): The timestamp when the profile was created.
        updated_at (DateTimeField): The timestamp when the profile was last updated.
    """
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
    """
    Represents an educational tutorial or guide on the platform.

    Attributes:
        id (UUIDField): The unique identifier for the tutorial.
        title (CharField): The title of the tutorial.
        description (TextField): A short description of the tutorial.
        content (TextField): The full content of the tutorial, likely in Markdown or HTML.
        difficulty (CharField): The difficulty level of the tutorial (e.g., BEGINNER, INTERMEDIATE).
        estimated_time (IntegerField): The estimated time to complete the tutorial in minutes.
        microcontroller (ForeignKey): The specific microcontroller the tutorial is for, if any.
        tags (JSONField): A list of tags for categorizing the tutorial.
        is_published (BooleanField): Whether the tutorial is visible to users.
        author (ForeignKey): The user who authored the tutorial.
        created_at (DateTimeField): The timestamp when the tutorial was created.
        updated_at (DateTimeField): The timestamp when the tutorial was last updated.
    """
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
    """
    Tracks a user's progress through a specific tutorial.

    Attributes:
        user (ForeignKey): The user who is taking the tutorial.
        tutorial (ForeignKey): The tutorial being taken.
        is_completed (BooleanField): Whether the user has completed the tutorial.
        completion_percentage (IntegerField): The user's progress percentage.
        started_at (DateTimeField): The timestamp when the user started the tutorial.
        completed_at (DateTimeField): The timestamp when the user completed the tutorial.
    """
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
    """
    Represents a case study or success story published on the platform.

    Attributes:
        id (UUIDField): The unique identifier for the case study.
        title (CharField): The title of the case study.
        subtitle (CharField): A brief subtitle.
        description (TextField): A summary of the case study.
        challenge (TextField): The problem or challenge that was addressed.
        solution (TextField): The solution that was implemented.
        results (TextField): The outcomes and results of the solution.
        technologies_used (JSONField): A list of technologies used in the project.
        industry (CharField): The industry to which the case study applies.
        company_name (CharField): The name of the company featured in the case study.
        image (URLField): A URL to a relevant image for the case study.
        company_logo (URLField): A URL to the company's logo.
        roi_percentage (FloatField): The return on investment percentage, if applicable.
        time_saved (CharField): A description of the time saved.
        cost_savings (CharField): A description of the cost savings.
        is_featured (BooleanField): Whether the case study is featured on the platform.
        created_at (DateTimeField): The timestamp when the case study was published.
    """
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
    """
    Stores inquiries submitted through the contact form.

    Attributes:
        id (UUIDField): The unique identifier for the inquiry.
        name (CharField): The name of the person making the inquiry.
        email (EmailField): The email address of the inquirer.
        company (CharField): The company of the inquirer, if provided.
        inquiry_type (CharField): The category of the inquiry (e.g., GENERAL, SUPPORT).
        subject (CharField): The subject of the inquiry.
        message (TextField): The content of the inquiry message.
        is_read (BooleanField): Whether the inquiry has been read by an admin.
        created_at (DateTimeField): The timestamp when the inquiry was submitted.
    """
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
    """
    Records daily statistics for the platform.

    Attributes:
        id (UUIDField): The unique identifier for the daily stat record.
        date (DateField): The date for which the statistics are recorded.
        active_users (IntegerField): The number of active users on that day.
        projects_created (IntegerField): The number of new projects created.
        code_executions (IntegerField): The number of code executions performed.
        tutorials_completed (IntegerField): The number of tutorials completed.
        countries_represented (IntegerField): The number of unique countries of users.
        uptime_percentage (FloatField): The platform's uptime percentage for the day.
        created_at (DateTimeField): The timestamp when the stat record was created.
    """
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
    """
    Represents a team member profile for the "About Us" page.

    Attributes:
        id (UUIDField): The unique identifier for the team member.
        name (CharField): The full name of the team member.
        role (CharField): The role or title of the team member.
        bio (TextField): A short biography of the team member.
        avatar (URLField): A URL to the team member's avatar image.
        linkedin_url (URLField): A URL to the team member's LinkedIn profile.
        github_url (URLField): A URL to the team member's GitHub profile.
        twitter_url (URLField): A URL to the team member's Twitter profile.
        is_active (BooleanField): Whether the team member is currently active.
        order (IntegerField): The display order for the team member.
        created_at (DateTimeField): The timestamp when the record was created.
    """
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
    """
    Represents an educational or support resource, such as documentation, tutorials, or blog posts.

    Attributes:
        id (UUIDField): The unique identifier for the resource.
        title (CharField): The title of the resource.
        description (TextField): A short description of the resource.
        resource_type (CharField): The type of the resource (e.g., DOCUMENTATION, VIDEO).
        url (URLField): The URL where the resource can be accessed.
        tags (JSONField): A list of tags for categorizing the resource.
        difficulty_level (CharField): The difficulty level of the resource, if applicable.
        is_featured (BooleanField): Whether the resource is featured on the platform.
        created_at (DateTimeField): The timestamp when the resource was added.
    """
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
