# CardioSight Universal 12-Class Federated ECG Backend
# Production Dockerfile for 24/7 Cloud Deployment (Render, Hugging Face Spaces, Railway, Fly.io)

FROM python:3.11-slim

WORKDIR /app

# Install system build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install PyTorch CPU first for minimal container size and fast build
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir torch --index-url https://download.pytorch.org/whl/cpu

# Install application dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all project files
COPY . .

# Environment configuration
ENV PYTHONUNBUFFERED=1
ENV PORT=8000
EXPOSE 8000

# Start FastAPI Uvicorn production server
CMD ["sh", "-c", "uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
