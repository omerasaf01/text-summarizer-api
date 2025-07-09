# Use Python 3.10 as base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    POETRY_VERSION=1.7.1 \
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_CREATE=false

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN pip install --no-cache-dir "poetry==$POETRY_VERSION"

# Configure poetry to use system instead of virtualenvs
RUN poetry config virtualenvs.create false

# Copy poetry configuration files
COPY pyproject.toml poetry.lock* /app/

# Install project dependencies
RUN poetry install --no-root

# Install spaCy model
RUN python -m spacy download en_core_web_sm

# Copy the rest of the application
COPY . /app/

# Set the path to include our source directory
RUN ls
# Command to run the application

EXPOSE 8001
CMD ["uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "8001"]
