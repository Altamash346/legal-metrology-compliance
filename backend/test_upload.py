import requests
import json
import time

base_url = "http://localhost:8000/api/v1"

# 1. Register/Login
try:
    requests.post(f"{base_url}/auth/register", json={"email":"test3@lmcc.gov.in","password":"Test12345","full_name":"Tester"})
except: pass
login = requests.post(f"{base_url}/auth/login", json={"email":"test3@lmcc.gov.in","password":"Test12345"}).json()
token = login['access_token']
headers = {"Authorization": f"Bearer {token}"}

# 2. Create Inspection
insp = requests.post(f"{base_url}/inspections/", json={"product_name":"Test Biscuits", "commodity_type":"food"}, headers=headers).json()
insp_id = insp['id']
print(f"Inspection ID: {insp_id}")

# 3. Upload Image
print("Uploading image...")
with open("test_label.png", "rb") as f:
    files = {"file": ("test_label.png", f, "image/png")}
    upload_res = requests.post(f"{base_url}/inspections/{insp_id}/images", files=files, headers=headers)
print("Upload response:", upload_res.json())

# 4. Get OCR Results
ocr = requests.get(f"{base_url}/inspections/{insp_id}/ocr", headers=headers).json()
print("\n--- OCR Text ---")
if ocr:
    print(ocr[0].get('full_text', 'No text extracted'))
else:
    print("No OCR result found")

# 5. Get Extracted Fields
fields = requests.get(f"{base_url}/inspections/{insp_id}/fields", headers=headers).json()
print("\n--- Extracted Fields ---")
for f in fields:
    print(f"{f['field_name']}: {f['normalized_value']} (Raw: {f['raw_value']})")

# 6. Get Compliance
comp = requests.get(f"{base_url}/inspections/{insp_id}/compliance", headers=headers).json()
print(f"\n--- Compliance Score: {comp.get('score')}% ---")
