from rest_framework import serializers
from .models import (
    Microcontroller, Project, CodeExecution, UserProfile, Tutorial, TutorialProgress,
    CaseStudy, ContactInquiry, PlatformStats, TeamMember, Resource
)
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class MicrocontrollerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Microcontroller
        fields = '__all__'
        depth = 1

class ProjectSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    collaborators = UserSerializer(many=True, read_only=True)
    microcontroller = MicrocontrollerSerializer(read_only=True)
    class Meta:
        model = Project
        fields = '__all__'
        depth = 1

class CodeExecutionSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    project = ProjectSerializer(read_only=True)
    class Meta:
        model = CodeExecution
        fields = '__all__'
        depth = 1

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    preferred_microcontrollers = MicrocontrollerSerializer(many=True, read_only=True)
    class Meta:
        model = UserProfile
        fields = '__all__'
        depth = 1

class TutorialSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    microcontroller = MicrocontrollerSerializer(read_only=True)
    class Meta:
        model = Tutorial
        fields = '__all__'
        depth = 1

class TutorialProgressSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    tutorial = TutorialSerializer(read_only=True)
    class Meta:
        model = TutorialProgress
        fields = '__all__'
        depth = 1

class CaseStudySerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseStudy
        fields = '__all__'

class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = '__all__'

class PlatformStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlatformStats
        fields = '__all__'

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = '__all__' 