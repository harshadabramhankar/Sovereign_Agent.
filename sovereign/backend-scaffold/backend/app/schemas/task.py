from pydantic import BaseModel, Field


class TaskCreate(BaseModel):
    prompt: str = Field(min_length=1)
    task_type: str
    file_name: str | None = None


class TaskStep(BaseModel):
    id: str
    label: str
    status: str


class TaskResponse(BaseModel):
    id: str
    status: str
    selected_model: str
    steps: list[TaskStep]
    output: str | None = None
    external_calls: int = 0