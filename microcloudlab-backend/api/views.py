from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .models import (
    Microcontroller, Project, CodeExecution, UserProfile, Tutorial, TutorialProgress,
    CaseStudy, ContactInquiry, PlatformStats, TeamMember, Resource
)
from .serializers import (
    MicrocontrollerSerializer, ProjectSerializer, CodeExecutionSerializer, UserProfileSerializer,
    TutorialSerializer, TutorialProgressSerializer, CaseStudySerializer, ContactInquirySerializer,
    PlatformStatsSerializer, TeamMemberSerializer, ResourceSerializer
)

class MicrocontrollerViewSet(viewsets.ModelViewSet):
    queryset = Microcontroller.objects.all()
    serializer_class = MicrocontrollerSerializer
    permission_classes = [AllowAny]

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
        # Get the first user or create a default user if none exists
        try:
            user = User.objects.first()
            if not user:
                user = User.objects.create_user(
                    username='default_user',
                    email='default@example.com',
                    password='defaultpass123'
                )
        except:
            # If there's any issue, create a default user
            user = User.objects.create_user(
                username='default_user',
                email='default@example.com',
                password='defaultpass123'
            )
        serializer.save(owner=user)

class CodeExecutionViewSet(viewsets.ModelViewSet):
    queryset = CodeExecution.objects.all()
    serializer_class = CodeExecutionSerializer
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
        # Get the first user or create a default user if none exists
        try:
            user = User.objects.first()
            if not user:
                user = User.objects.create_user(
                    username='default_user',
                    email='default@example.com',
                    password='defaultpass123'
                )
        except:
            user = User.objects.create_user(
                username='default_user',
                email='default@example.com',
                password='defaultpass123'
            )
        serializer.save(user=user)

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]

class TutorialViewSet(viewsets.ModelViewSet):
    queryset = Tutorial.objects.all()
    serializer_class = TutorialSerializer
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
        # Get the first user or create a default user if none exists
        try:
            user = User.objects.first()
            if not user:
                user = User.objects.create_user(
                    username='default_user',
                    email='default@example.com',
                    password='defaultpass123'
                )
        except:
            user = User.objects.create_user(
                username='default_user',
                email='default@example.com',
                password='defaultpass123'
            )
        serializer.save(author=user)

class TutorialProgressViewSet(viewsets.ModelViewSet):
    queryset = TutorialProgress.objects.all()
    serializer_class = TutorialProgressSerializer
    permission_classes = [AllowAny]

class CaseStudyViewSet(viewsets.ModelViewSet):
    queryset = CaseStudy.objects.all()
    serializer_class = CaseStudySerializer
    permission_classes = [AllowAny]

class ContactInquiryViewSet(viewsets.ModelViewSet):
    queryset = ContactInquiry.objects.all()
    serializer_class = ContactInquirySerializer
    permission_classes = [AllowAny]

class PlatformStatsViewSet(viewsets.ModelViewSet):
    queryset = PlatformStats.objects.all()
    serializer_class = PlatformStatsSerializer
    permission_classes = [AllowAny]

class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [AllowAny]

class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    permission_classes = [AllowAny]