from fastapi import FastAPI, Body, Response
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json
import parser


app = FastAPI()
#origins = ["http://localhost:3000"]
origins = ["*"]
app.add_middleware(
CORSMiddleware,
allow_origins=origins,
allow_credentials=True,
allow_methods=["*"],  # Permite todos los métodos, pero puedes ser más específico
allow_headers=["*"],  # Permite todos los encabezados
)

class Data(BaseModel):
    data: str

@app.get("/")
async def root():
    return {"message": "OK"}

@app.get("/api")
async def get_data():
    with open('data.json', 'r') as file:
        #data = json.load(file)
        #data = data['ranking']
        data = parser.process_data()
    encoded_data = json.dumps(data).encode("utf-8")
    return Response(content=encoded_data, media_type="application/json; charset=UTF-8")

@app.post("/api")
async def save_data(data: Data):
    data = str(data.data)
    with open("data.json", "w") as file:
        file.write(data)
    print("data saved")
    return {"message": "OK"}




if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
