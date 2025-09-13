from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.http import JsonResponse
import json
from .models import (
    Microcontroller, Project, CodeExecution, UserProfile, Tutorial, TutorialProgress,
    CaseStudy, ContactInquiry, PlatformStats, TeamMember, Resource
)
from .serializers import (
    MicrocontrollerSerializer, ProjectSerializer, CodeExecutionSerializer, UserProfileSerializer,
    TutorialSerializer, TutorialProgressSerializer, CaseStudySerializer, ContactInquirySerializer,
    PlatformStatsSerializer, TeamMemberSerializer, ResourceSerializer
)

# Global variable to store the last peripheral data for viewing
last_peripheral_data = None
peripheral_data_history = []  # Store history of all peripheral communications

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

# Generic Peripheral Communication Endpoint
@api_view(['POST'])
@permission_classes([AllowAny])
def peripheral_send(request):
    """
    Handle peripheral configuration data from frontend for all peripheral types
    Supports: UART, SPI, I2C, PWM, GPIO, ADC, DAC, CAN, USB, WiFi, Bluetooth
    """
    try:
        data = request.data
        peripheral_type = data.get('peripheral_type', 'unknown').upper()
        instance = data.get('instance', 'unknown')
        mcu_id = data.get('mcu_id', 'unknown')
        configuration = data.get('configuration', {})
        raw_data = data.get('data', [])
        
        # Store the data globally for viewing
        global last_peripheral_data, peripheral_data_history
        timestamp = json.dumps(data.get('timestamp', 'unknown'))
        
        peripheral_data = {
            'peripheral_type': peripheral_type,
            'instance': instance,
            'mcu_id': mcu_id,
            'configuration': configuration,
            'raw_data': raw_data,
            'hex_data': ' '.join([f'{byte:02X}' for byte in raw_data]) if raw_data else 'No raw data',
            'timestamp': timestamp,
            'data_length': len(raw_data) if raw_data else 0
        }
        
        last_peripheral_data = peripheral_data
        peripheral_data_history.append(peripheral_data)
        
        # Keep only last 50 communications to prevent memory issues
        if len(peripheral_data_history) > 50:
            peripheral_data_history = peripheral_data_history[-50:]
        
        # Log the received data for debugging
        print("\n" + "="*80)
        print(f"🔧 {peripheral_type} PERIPHERAL CONFIGURATION RECEIVED")
        print("="*80)
        print(f"📱 MCU: {mcu_id}")
        print(f"🔌 Peripheral: {peripheral_type}")
        print(f"🏷️  Instance: {instance}")
        print(f"📏 Data length: {len(raw_data)} bytes")
        print(f"📦 Raw data: {raw_data}")
        print(f"🔢 Hex data: {peripheral_data['hex_data']}")
        
        # Log configuration details
        print(f"⚙️  Configuration:")
        for key, value in configuration.items():
            print(f"   {key}: {value}")
        
        # Parse frame structure for better understanding (if raw data exists)
        if raw_data and len(raw_data) >= 4:
            start_byte = raw_data[0]
            command = raw_data[1] 
            length = raw_data[2]
            data_section = raw_data[3:-1] if len(raw_data) > 4 else []
            end_byte = raw_data[-1] if len(raw_data) > 0 else None
            
            print(f"📋 Frame Structure:")
            print(f"   Start: 0x{start_byte:02X} ({start_byte})")
            print(f"   Command: 0x{command:02X} ({command})")
            print(f"   Length: 0x{length:02X} ({length})")
            print(f"   Data: {data_section}")
            print(f"   End: 0x{end_byte:02X} ({end_byte})" if end_byte is not None else "   End: N/A")
        
        print("="*80)
        
        # Here you would typically:
        # 1. Validate the data format based on peripheral type
        # 2. Send it to the actual hardware via appropriate communication method
        # 3. Return success/failure status
        
        # For now, we'll just simulate success
        response_data = {
            'status': 'success',
            'message': f'{peripheral_type} configuration sent to {mcu_id}',
            'peripheral_type': peripheral_type,
            'instance': instance,
            'mcu_id': mcu_id,
            'data_length': len(raw_data) if raw_data else 0,
            'timestamp': timestamp
        }
        
        return Response(response_data, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Error processing {peripheral_type} data: {str(e)}")
        return Response(
            {'status': 'error', 'message': str(e)}, 
            status=status.HTTP_400_BAD_REQUEST
        )

# Peripheral Data Viewer Endpoints
@api_view(['GET'])
@permission_classes([AllowAny])
def peripheral_view(request):
    """
    View the last received peripheral configuration data
    """
    global last_peripheral_data
    
    if last_peripheral_data is None:
        return Response({
            'status': 'no_data',
            'message': 'No peripheral data received yet. Send a configuration first.',
            'data': None
        })
    
    return Response({
        'status': 'success',
        'message': f'Last {last_peripheral_data["peripheral_type"]} configuration data',
        'data': last_peripheral_data
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def peripheral_history(request):
    """
    View the history of all peripheral communications
    """
    global peripheral_data_history
    
    return Response({
        'status': 'success',
        'message': f'Peripheral communication history ({len(peripheral_data_history)} entries)',
        'data': peripheral_data_history,
        'count': len(peripheral_data_history)
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def peripheral_view_by_type(request, peripheral_type):
    """
    View peripheral data filtered by type
    """
    global peripheral_data_history
    
    filtered_data = [
        data for data in peripheral_data_history 
        if data['peripheral_type'].upper() == peripheral_type.upper()
    ]
    
    return Response({
        'status': 'success',
        'message': f'{peripheral_type.upper()} peripheral data ({len(filtered_data)} entries)',
        'data': filtered_data,
        'count': len(filtered_data)
    })