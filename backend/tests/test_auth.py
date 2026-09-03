import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_register_login(client: AsyncClient):
    # Register
    reg_res = await client.post("/api/v1/auth/register", json={
        "email": "test@example.com",
        "password": "password123",
        "full_name": "Test User",
        "role": "VIEWER"
    })
    assert reg_res.status_code == 200
    
    # Login
    log_res = await client.post("/api/v1/auth/login", json={
        "email": "test@example.com",
        "password": "password123"
    })
    assert log_res.status_code == 200
    token = log_res.json()["access_token"]
    
    # Get Me
    me_res = await client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert me_res.status_code == 200
    assert me_res.json()["email"] == "test@example.com"
