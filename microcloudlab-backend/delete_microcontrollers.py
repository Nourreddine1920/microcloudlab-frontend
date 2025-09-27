#!/usr/bin/env python3
"""
Script to bulk delete microcontrollers using the API endpoint
"""

import requests
import json

# Configuration
API_BASE_URL = "http://localhost:8000/api"  # Adjust this to your backend URL
BULK_DELETE_ENDPOINT = f"{API_BASE_URL}/microcontrollers/bulk-delete/"

# List of microcontroller IDs to delete (from your JSON)
MICROCONTROLLER_IDS = [
    "c64477be-664f-4097-a795-fbfbbe937c29",
    "e3e69dcb-c30d-4e82-9409-7ba06d1c2ac7",
    "82f0c813-5b4a-400b-a9b6-5240a02590e1",
    "bb012142-03be-42c5-8c34-9f62c2a3d7b6",
    "ddc1272c-5b01-47d8-90c9-e1e406cea35c",
    "9b5bad75-6d3e-44ea-984f-0567c52944d1",
    "52198200-15a6-4f71-b623-db0c689b5cf2",
    "78add2af-648e-4525-8811-32ff779b2138",
    "5159fd12-3e9a-48b8-bae3-a1ef816bdb74",
    "b3acd387-df0b-4255-974a-5e184f9bacac",
    "d587f622-7ed4-48cf-92cd-20f4b549fe25",
    "0b562d0e-bd10-41ba-926d-09ff6b9a1470"
]

def delete_microcontrollers():
    """
    Delete the specified microcontrollers using the bulk delete API
    """
    print("🚀 Starting bulk delete operation...")
    print(f"📋 Total microcontrollers to delete: {len(MICROCONTROLLER_IDS)}")
    print("-" * 50)
    
    # Prepare the request data
    request_data = {
        "ids": MICROCONTROLLER_IDS
    }
    
    try:
        # Make the API request
        response = requests.post(
            BULK_DELETE_ENDPOINT,
            json=request_data,
            headers={'Content-Type': 'application/json'}
        )
        
        # Check if the request was successful
        if response.status_code == 200:
            result = response.json()
            
            print("✅ Bulk delete completed successfully!")
            print(f"📊 Results:")
            print(f"   • Total requested: {result.get('total_requested', 0)}")
            print(f"   • Successfully deleted: {result.get('successful_deletions', 0)}")
            print(f"   • Failed deletions: {result.get('failed_deletions', 0)}")
            print()
            
            # Show deleted microcontrollers
            deleted_mcus = result.get('deleted_microcontrollers', [])
            if deleted_mcus:
                print("🗑️  Deleted microcontrollers:")
                for mcu in deleted_mcus:
                    print(f"   • {mcu['name']} ({mcu['type']}) - ID: {mcu['id']}")
                print()
            
            # Show any failures
            invalid_ids = result.get('invalid_ids', [])
            if invalid_ids:
                print("❌ Failed deletions:")
                for failure in invalid_ids:
                    print(f"   • {failure['name']} (ID: {failure['id']}) - {failure['reason']}")
                print()
            
        else:
            print(f"❌ API request failed with status code: {response.status_code}")
            print(f"Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection error: Could not connect to the backend server.")
        print("   Make sure your Django backend is running on the correct port.")
    except requests.exceptions.RequestException as e:
        print(f"❌ Request error: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

def verify_deletion():
    """
    Verify that the microcontrollers were actually deleted
    """
    print("\n🔍 Verifying deletion...")
    
    try:
        # Get all microcontrollers
        response = requests.get(f"{API_BASE_URL}/microcontrollers/")
        
        if response.status_code == 200:
            remaining_mcus = response.json()
            print(f"📊 Remaining microcontrollers: {len(remaining_mcus)}")
            
            # Check if any of our target IDs still exist
            remaining_ids = [mcu['id'] for mcu in remaining_mcus]
            still_exist = [mcu_id for mcu_id in MICROCONTROLLER_IDS if mcu_id in remaining_ids]
            
            if still_exist:
                print(f"⚠️  Warning: {len(still_exist)} microcontrollers still exist:")
                for mcu_id in still_exist:
                    print(f"   • {mcu_id}")
            else:
                print("✅ All target microcontrollers have been successfully deleted!")
        else:
            print(f"❌ Could not verify deletion. Status code: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Verification failed: {e}")

if __name__ == "__main__":
    print("=" * 60)
    print("🔧 Microcontroller Bulk Delete Tool")
    print("=" * 60)
    
    # Confirm before proceeding
    print(f"\n⚠️  WARNING: This will delete {len(MICROCONTROLLER_IDS)} microcontrollers!")
    print("This action cannot be undone.")
    
    confirm = input("\nDo you want to proceed? (yes/no): ").lower().strip()
    
    if confirm in ['yes', 'y']:
        delete_microcontrollers()
        verify_deletion()
    else:
        print("❌ Operation cancelled.")
    
    print("\n" + "=" * 60)
    print("🏁 Script completed.")
