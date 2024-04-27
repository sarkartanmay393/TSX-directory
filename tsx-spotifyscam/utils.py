import random
import string


def generate_random_email() -> str:
    domain = "@gmail.com"
    username_length = random.randint(10, 18)
    username = ''.join(random.choice(string.ascii_lowercase + string.digits + string.ascii_uppercase)
                       for _ in range(username_length))
    return username + domain


def generate_random_password():
    password_length = random.randint(10, 14)
    password = ''.join(random.choice(string.ascii_lowercase + string.digits + string.ascii_uppercase + '!#')
                       for _ in range(password_length))
    return password+"#"
