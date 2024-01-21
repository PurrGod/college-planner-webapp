import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

# MongoDB connection setup
connection_string  = "mongodb+srv://ymalegao:hackathon@major-class.bcgywbx.mongodb.net/"
client = MongoClient(connection_string)  # Update with your connection string
db = client['Majors']  # Replace with your database name
majors_col = db['classes']  # Replace with your collection name

# Function to get course prerequisites
tmp = []

def get_course_prerequisites(course_url):
    response = requests.get(course_url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        requirements_section = soup.find('h4')
        tmp = requirements_section.findNextSibling('p')
        print(tmp.text)
        prerequisites_array = (tmp.text)
        print(prerequisites_array)
        prerequisites = prerequisites_array.split(" or ")
        return prerequisites_array
    else:
        print('Failed to retrieve the webpage.')
    return "No prerequisites found or failed to fetch."


# URL of the webpage to scrape
# url = 'https://catalog.ucsc.edu/en/current/general-catalog/academic-units/baskin-engineering/computational-media/games-and-playable-media-ms/'
url = 'https://catalog.ucsc.edu/current/general-catalog/academic-units/baskin-engineering/computational-media/computer-science-computer-game-design-bs/'

def get_classes(url):
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')

    # Extract major name
        major_name = soup.find('h1').text if soup.find('h1') else 'Unknown Major'
        print(major_name)
        # Initialize major data
        major_data = {
            "name": major_name,
            "requirements": [],
            "prerequisites": []
        }

    # Extract course numbers and links
        courselinks = soup.find_all(class_='sc-courselink')
        for link in courselinks:
            link_text = link.text.strip()
            print(link_text)
            if not link_text.startswith(("One", "Either", "or")) and link_text not in major_data["requirements"] and link_text != "":
                course_name = link_text
                course_url = 'https://catalog.ucsc.edu' + link['href']
                prerequisites = get_course_prerequisites(course_url)
                # tmp.append((course_name, course_url))
                major_data["requirements"].append(course_name)
                major_data["prerequisites"].append({course_name: prerequisites})
            else:
                print("link_text starts with One, Either, or")
        print(major_data)


        # Insert data into MongoDB
        majors_col.insert_one(major_data)
        print(f"Data for {major_name} inserted into MongoDB.")
    else:
        print('Failed to retrieve the webpage.')





# url = "https://catalog.ucsc.edu/current/general-catalog/academic-units/baskin-engineering/biomolecular-engineering/biomolecular-engineering-and-bioinformatics-bs/"

adawd = ["https://catalog.ucsc.edu/en/current/general-catalog/academic-units/baskin-engineering/technology-and-information-management/technology-and-information-management-bs/", "https://catalog.ucsc.edu/current/general-catalog/academic-units/arts-division/film-and-digital-media/film-and-digital-media-ba/", "https://catalog.ucsc.edu/en/current/general-catalog/academic-units/arts-division/history-of-art-and-visual-culture/history-of-art-and-visual-culture-ba/", "https://catalog.ucsc.edu/en/current/general-catalog/academic-units/social-sciences-division/economics/economics-ba/", "https://catalog.ucsc.edu/en/current/general-catalog/academic-units/social-sciences-division/environmental-studies/environmental-studies-ba/", "https://catalog.ucsc.edu/current/general-catalog/academic-units/baskin-engineering/biomolecular-engineering/biomolecular-engineering-and-bioinformatics-bs/"]


# get_classes(url)

for i in adawd:
    get_classes(i)

