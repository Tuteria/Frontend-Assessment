import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.join(BASE_DIR, "..", "..", "example.db")
DATABASE_URL = "postgres://smmuymuwdjdnwh:d32a41d2a517936b68388f2236d12e4680a3ea6e6bd42bfebc70aa3cde7e358e@ec2-52-71-85-210.compute-1.amazonaws.com:5432/dbekvrbcb0rauv"
print(DATABASE_URL)
