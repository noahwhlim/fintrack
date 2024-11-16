from flask import request, jsonify
from config import app, db
from models import User, Transaction

# TEST
@app.route("/test", methods=["GET"])
def test():
    id = request.args.get("id")
    if id == None:
        return jsonify({"message": "Hello, World!"})
    else:
        return jsonify({"message": f"Hello, {id}!"})
    
# GET
@app.route("/transactions", methods=["GET"])
def get_transactions():
    tid = request.args.get("tid")
    if tid == None:
        transactions = Transaction.query.all()
        return jsonify([transaction.to_json() for transaction in transactions])
    else:
        transaction = Transaction.query.get(tid)
        return jsonify(transaction.to_json())

    
@app.route("/balance", methods=["GET"])
def get_balance():
    transactions = Transaction.query.all()
    balance = 0
    for transaction in transactions:
        if transaction.type == "income":
            balance += transaction.amount
        else:
            balance -= transaction.amount
    return jsonify({"balance": round(balance, 2)})

@app.route("/income", methods=["GET"])
def get_income():
    transactions = Transaction.query.all()
    balance = 0
    for transaction in transactions:
        if transaction.type == "income":
            balance += transaction.amount
    return jsonify({"balance": round(balance, 2)})

@app.route("/expenses", methods=["GET"])
def get_expenses():
    transactions = Transaction.query.all()
    balance = 0
    for transaction in transactions:
        if transaction.type == "expense":
            balance += transaction.amount
    return jsonify({"balance": round(balance, 2)})

# POST
@app.route("/transactions", methods=["POST"])
def create_transaction():
    data = request.get_json()
    new_transaction = Transaction(
        amount=round(int(data["amount"]), 2),
        type=data["type"],
        category=data["category"],
        description=data["description"]
    )
    db.session.add(new_transaction)
    db.session.commit()
    return jsonify({"message": "Transaction created"})

# PATCH
@app.route("/transactions/<int:tid>", methods=["PATCH"])
def modify_transaction(tid):
    transaction = Transaction.query.get(tid)

    if not transaction: 
        return jsonify({"message": "Transaction not found"}), 404
    
    data = request.json
    transaction.amount = data["amount"]
    transaction.type = data["type"]
    transaction.category = data["category"]
    transaction.description = data["description"]
    db.session.commit()
    return jsonify({"message": "Transaction updated"})

# DELETE
@app.route("/transactions/<int:tid>", methods=["DELETE"])
def delete_transaction(tid):
    transaction = Transaction.query.get(tid)
    db.session.delete(transaction)
    db.session.commit()
    return jsonify({"message": "Transaction deleted"})

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)