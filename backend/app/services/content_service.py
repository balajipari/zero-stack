from app.models.content import Content
from typing import List, Optional

async def create_content(type: str, title: str, body: str, tags: Optional[list] = None, status: str = "draft", author_id: int = None):
    content = await Content.create(
        type=type,
        title=title,
        body=body,
        tags=tags,
        status=status,
        author_id=author_id
    )
    return content

async def get_content_by_id(content_id: int):
    return await Content.get_or_none(id=content_id)

async def get_all_content() -> List[Content]:
    return await Content.all()

async def update_content(content_id: int, **kwargs):
    content = await Content.get_or_none(id=content_id)
    if not content:
        return None
    for key, value in kwargs.items():
        setattr(content, key, value)
    await content.save()
    return content

async def delete_content(content_id: int):
    content = await Content.get_or_none(id=content_id)
    if content:
        await content.delete()
        return True
    return False 