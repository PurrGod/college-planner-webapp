import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

# MongoDB connection setup
connection_string = "your_connection_string"
client = MongoClient(connection_string)
db = client['Majors']
majors_col = db['classes']

def get_course_prerequisites(course_url):
    response = requests.get(course_url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        requirements_section = soup.find('h4')
        tmp = requirements_section.findNextSibling('p')
        prerequisites_array = (tmp.text[17:])
        prerequisites = prerequisites_array.split(" or ")
        return prerequisites
    else:
        print('Failed to retrieve the webpage.')
    return "No prerequisites found or failed to fetch."

def get_elective_group_courses(soup):
    elective_groups = []
    elective_headings = soup.find_all('h5', class_='sc-RequiredCoursesHeading3')

    for heading in elective_headings:
        group = {'groupName': heading.text.strip(), 'courses': []}

        # The elective courses are contained in a table that follows the heading
        next_table = heading.find_next_sibling('table')
        
        if next_table:
            rows = next_table.find_all('tr', class_='blackBar')
            for row in rows:
                
                course_link = row.find('a', class_='sc-courselink')
                print(course_link)
                return
                if course_link and course_link.text.strip():
                    course_name = course_link.text.strip()
                    course_url = 'https://catalog.ucsc.edu' + course_link['href']
                    group['courses'].append({'name': course_name, 'url': course_url})
        
        elective_groups.append(group)
    
    return elective_groups


# URL of the webpage to scrape
url = 'https://catalog.ucsc.edu/current/general-catalog/academic-units/baskin-engineering/computational-media/computer-science-computer-game-design-bs/'
response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')

    major_name = soup.find('h1').text.strip() if soup.find('h1') else 'Unknown Major'
    major_data = {
        "name": major_name,
        "coreCourses": [],  # For required courses
        "electiveGroups": get_elective_group_courses(soup)  # For elective groups
    }

    courselinks = soup.find_all(class_='sc-courselink')
    for link in courselinks:
        course_name = link.text.strip()
        if not course_name.startswith(("One", "Either", "or")):
            course_url = 'https://catalog.ucsc.edu' + link['href']
            prerequisites = get_course_prerequisites(course_url)
            major_data["coreCourses"].append(course_name)
        # For prerequisites, you might need additional logic depending on how they are structured on the webpage

    # majors_col.insert_one(major_data)
    print(major_data)
    print(f"Data for {major_name} inserted into MongoDB.")
else:
    print('Failed to retrieve the webpage.')
