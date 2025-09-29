from rest_framework import serializers
from .models import (
    Microcontroller, Project, CodeExecution, UserProfile, Tutorial, TutorialProgress,
    CaseStudy, ContactInquiry, PlatformStats, TeamMember, Resource
)
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model, providing essential user details."""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class MicrocontrollerSerializer(serializers.ModelSerializer):
    """Serializer for the Microcontroller model."""
    class Meta:
        model = Microcontroller
        fields = '__all__'
        depth = 1


class ProjectSerializer(serializers.ModelSerializer):
    """
    Serializer for the Project model.
    Includes nested serialization for owner, collaborators, and microcontroller.
    """
    owner = UserSerializer(read_only=True)
    collaborators = UserSerializer(many=True, read_only=True)
    microcontroller = MicrocontrollerSerializer(read_only=True)
    class Meta:
        model = Project
        fields = '__all__'
        depth = 1


class CodeExecutionSerializer(serializers.ModelSerializer):
    """
    Serializer for the CodeExecution model.
    Includes nested serialization for the user and project.
    """
    user = UserSerializer(read_only=True)
    project = ProjectSerializer(read_only=True)
    class Meta:
        model = CodeExecution
        fields = '__all__'
        depth = 1


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the UserProfile model.
    Includes nested serialization for the user and preferred microcontrollers.
    """
    user = UserSerializer(read_only=True)
    preferred_microcontrollers = MicrocontrollerSerializer(many=True, read_only=True)
    class Meta:
        model = UserProfile
        fields = '__all__'
        depth = 1


class TutorialSerializer(serializers.ModelSerializer):
    """
    Serializer for the Tutorial model.
    Includes nested serialization for the author and microcontroller.
    """
    author = UserSerializer(read_only=True)
    microcontroller = MicrocontrollerSerializer(read_only=True)
    class Meta:
        model = Tutorial
        fields = '__all__'
        depth = 1


class TutorialProgressSerializer(serializers.ModelSerializer):
    """
    Serializer for the TutorialProgress model.
    Includes nested serialization for the user and tutorial.
    """
    user = UserSerializer(read_only=True)
    tutorial = TutorialSerializer(read_only=True)
    class Meta:
        model = TutorialProgress
        fields = '__all__'
        depth = 1


class CaseStudySerializer(serializers.ModelSerializer):
    """Serializer for the CaseStudy model."""
    class Meta:
        model = CaseStudy
        fields = '__all__'


class ContactInquirySerializer(serializers.ModelSerializer):
    """Serializer for the ContactInquiry model."""
    class Meta:
        model = ContactInquiry
        fields = '__all__'


class PlatformStatsSerializer(serializers.ModelSerializer):
    """Serializer for the PlatformStats model."""
    class Meta:
        model = PlatformStats
        fields = '__all__'


class TeamMemberSerializer(serializers.ModelSerializer):
    """Serializer for the TeamMember model."""
    class Meta:
        model = TeamMember
        fields = '__all__'


class ResourceSerializer(serializers.ModelSerializer):
    """Serializer for the Resource model."""
    class Meta:
        model = Resource
        fields = '__all__' 