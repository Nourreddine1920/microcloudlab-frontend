from django.contrib import admin
from .models import (
    Microcontroller, Project, CodeExecution, UserProfile, Tutorial, TutorialProgress,
    CaseStudy, ContactInquiry, PlatformStats, TeamMember, Resource
)

admin.site.register(Microcontroller)
admin.site.register(Project)
admin.site.register(CodeExecution)
admin.site.register(UserProfile)
admin.site.register(Tutorial)
admin.site.register(TutorialProgress)
admin.site.register(CaseStudy)
admin.site.register(ContactInquiry)
admin.site.register(PlatformStats)
admin.site.register(TeamMember)
admin.site.register(Resource)
