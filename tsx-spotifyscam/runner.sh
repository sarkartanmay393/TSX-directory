#!/bin/bash

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Python is not installed. Installing..."
    # Install Python based on the OS
    if [[ "$(uname)" == "Darwin" ]]; then
        brew install python3
    elif [[ "$(expr substr $(uname -s) 1 5)" == "Linux" ]]; then
        sudo apt-get update
        sudo apt-get install python3
    else
        echo "Unsupported operating system"
        exit 1
    fi
fi

# Install requirements
if ! pip3 show -q -r requirements.txt; then
    echo "Installing requirements..."
    pip3 install -r requirements.txt
fi

# Run the Python file init.py
python3 init.py
