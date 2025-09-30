# app.py
from flask import Flask, request, jsonify
from twilio.rest import Client
import os

app = Flask(__name__)

# Your Twilio account credentials
# It's best practice to use environment variables for these
account_sid = os.environ.get('AC1ca13bb437df087d1e8a960b9785739c')
auth_token = os.environ.get('d43f8eaaf27d770bf0bb5e550b1b7e5d')
twilio_phone_number = os.environ.get('+14473455528')
your_phone_number = '+919100403411'  # Replace with your actual phone number

client = Client(account_sid, auth_token)

@app.route('/send_message', methods=['POST'])
def send_message():
    try:
        # Get data from the form
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject')
        message = data.get('message')

        # Construct the message to send
        sms_body = f"New message from your portfolio!\n\nName: {name}\nEmail: {email}\nSubject: {subject}\nMessage: {message}"

        # Send the SMS using the Twilio API
        message = client.messages.create(
            to=your_phone_number,
            from_=twilio_phone_number,
            body=sms_body
        )

        return jsonify({'status': 'success', 'message_sid': message.sid}), 200

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)