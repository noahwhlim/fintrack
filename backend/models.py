from config import db
from datetime import datetime

class User(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    google_id = db.Column(db.String(80), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)

    def to_json(self):
        return {
            "uid": self.uid,
            "email": self.email,
            "googleId": self.google_id,
            "username": self.username,
        }
    


class Transaction(db.Model):
    tid = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey("user.uid"))
    amount = db.Column(db.Double, nullable=False)
    type = db.Column(db.String(10), nullable=False)
    category = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(100), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now())

    def to_json(self):
        return {
            "tid": self.tid,
            "uid": self.uid,
            "amount": self.amount,
            "type": self.type,
            "category": self.category,
            "description": self.description,
            "timestamp": self.timestamp
        }
    
