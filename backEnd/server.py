from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'super-secret-key'

db = SQLAlchemy(app)
jwt = JWTManager(app)

current_user = None

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'User(id={self.id}, username={self.username}, password={self.password})'

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists!'}), 400

    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=username)
    return jsonify({'access_token': access_token}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username, password=password).first()

    if not user:
        return jsonify({'message': 'Invalid credentials!'}), 401

    global current_user
    current_user = username

    access_token = create_access_token(identity=username)
    return jsonify({'access_token': access_token}), 200

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    global current_user
    return jsonify({'message': f'You are authenticated as {current_user}!'}), 200

posts = []

@app.route('/api/post', methods=['POST'])
def create_post():
    title = request.json.get('title', '')
    body = request.json.get('body', '')
    if not title:
        return jsonify({'error': 'Title is required'}), 400
    if not body:
        return jsonify({'error': 'Body is required'}), 400
    post = {
        'title': title,
        'body': body,
        'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    posts.append(post)
    return jsonify(post), 201

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='100.86.228.125', port='5000', debug=True)