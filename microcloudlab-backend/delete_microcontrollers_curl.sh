#!/bin/bash

# Script to delete microcontrollers using curl
# Make sure your Django backend is running before executing this script

API_BASE_URL="http://localhost:8000/api"
BULK_DELETE_ENDPOINT="${API_BASE_URL}/microcontrollers/bulk-delete/"

echo "🚀 Starting bulk delete operation using curl..."
echo "📋 Deleting 12 microcontrollers..."
echo "----------------------------------------"

# The JSON payload with all the microcontroller IDs
curl -X POST "${BULK_DELETE_ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d '{
    "ids": [
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
  }' \
  | python -m json.tool

echo ""
echo "🏁 Bulk delete operation completed!"
echo "Check the response above for details."
