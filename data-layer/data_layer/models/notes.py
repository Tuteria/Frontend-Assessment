from data_layer.models.base import Base
import sqlalchemy as sql


class Notes(Base):
    __tablename__ = "notes"
    id = sql.Column(sql.Integer, primary_key=True)
    authorId = sql.Column(sql.Integer)
    title = sql.Column(sql.String)
    description = sql.Column(sql.Text)

    def __repr__(self):
        return f"<Note (id={self.id}, title={self.title})>"

