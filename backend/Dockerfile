FROM python:3.12.5

WORKDIR .

#COPY requirements.txt ./
#RUN pip install --no-cache-dir -r requirements.txt
RUN pip install fastapi uvicorn numpy pandas

COPY . .

EXPOSE 8000

#CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]
CMD ["python", "api.py"]
