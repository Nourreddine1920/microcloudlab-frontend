from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    MicrocontrollerViewSet, ProjectViewSet, CodeExecutionViewSet, UserProfileViewSet,
    TutorialViewSet, TutorialProgressViewSet, CaseStudyViewSet, ContactInquiryViewSet,
    PlatformStatsViewSet, TeamMemberViewSet, ResourceViewSet, 
    peripheral_send, peripheral_view, peripheral_history, peripheral_view_by_type
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
    # Generic peripheral communication endpoints
    path('peripheral/send/', peripheral_send, name='peripheral_send'),
    path('peripheral/view/', peripheral_view, name='peripheral_view'),
    path('peripheral/history/', peripheral_history, name='peripheral_history'),
    path('peripheral/view/<str:peripheral_type>/', peripheral_view_by_type, name='peripheral_view_by_type'),
    # Legacy UART endpoints for backward compatibility
    path('uart/send/', peripheral_send, name='uart_send'),
    path('uart/view/', peripheral_view, name='uart_view'),
]