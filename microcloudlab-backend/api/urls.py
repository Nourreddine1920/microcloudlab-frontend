from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    MicrocontrollerViewSet, ProjectViewSet, CodeExecutionViewSet, UserProfileViewSet,
    TutorialViewSet, TutorialProgressViewSet, CaseStudyViewSet, ContactInquiryViewSet,
    PlatformStatsViewSet, TeamMemberViewSet, ResourceViewSet
)

router = DefaultRouter()
router.register(r'microcontrollers', MicrocontrollerViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'codeexecutions', CodeExecutionViewSet)
router.register(r'userprofiles', UserProfileViewSet)
router.register(r'tutorials', TutorialViewSet)
router.register(r'tutorialprogress', TutorialProgressViewSet)
router.register(r'casestudies', CaseStudyViewSet)
router.register(r'contactinquiries', ContactInquiryViewSet)
router.register(r'platformstats', PlatformStatsViewSet)
router.register(r'teammembers', TeamMemberViewSet)
router.register(r'resources', ResourceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]