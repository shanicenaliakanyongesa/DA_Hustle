import pymysql
# Database configuration
db_config = {
    'user': 'root',
    'password': '',
    'host': 'localhost',
    'database': 'hustle_db'
}

db_config2 = {
    'user': 'root',
    'password': '',
    'host': 'localhost',
    'database': 'hustle_db'
}

def get_locations():
    connection = pymysql.connect(**db_config)
    cursor = connection.cursor()
    cursor.execute("SELECT location_name FROM locations")
    locations = cursor.fetchall()
    cursor.close()
    connection.close()
    return locations

def get_jobType():
    connection = pymysql.connect(**db_config)
    cursor = connection.cursor()
    cursor.execute("SELECT id, jobtype_name FROM jobtypes")
    type = cursor.fetchall()
    cursor.close()
    connection.close()
    return type

def get_salaryRange():
    connection = pymysql.connect(**db_config)
    cursor = connection.cursor()
    cursor.execute("SELECT id, salary_range FROM salaryranges")
    range = cursor.fetchall()
    cursor.close()
    connection.close()
    return range

# def get_featured_jobs():
#     connection = pymysql.connect(**db_config)
#     cursor = connection.cursor()
#     cursor.execute("SELECT companies.company_name, companies.company_logo, postedjobs.job_title, jobtypes.jobtype_name, locations.location_name, GROUP_CONCAT( skills.skill_name SEPARATOR',') as skills FROM postedjobs LEFT JOIN companies ON postedjobs.company_id = companies.id left JOIN locations ON locations.id = postedjobs.job_location_id LEFT JOIN jobtypes ON jobtypes.id = postedjobs.jobtype_id LEFT JOIN postedjobs_skills ON postedjobs.id = postedjobs_skills.posted_job_id LEFT JOIN skills ON skills.id = postedjobs_skills.skill_id GROUP BY companies.company_name, companies.company_logo, postedjobs.job_title, jobtypes.jobtype_name, locations.location_name")
#     featured_jobs = cursor.fetchall()
#     cursor.close()
#     connection.close()
#     return featured_jobs


def get_featured_jobs(job_title=None, location=None, job_type=None, salary_range=None, tag=None):
    connection = pymysql.connect(**db_config)
    cursor = connection.cursor()

    query = """
    SELECT companies.company_name, companies.company_logo, postedjobs.job_title,
      CASE 
        WHEN TIMESTAMPDIFF(MINUTE, postedjobs.updated_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, postedjobs.updated_at, NOW()), ' Min Ago')
        WHEN TIMESTAMPDIFF(HOUR, postedjobs.updated_at, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, postedjobs.updated_at, NOW()), ' Hrs Ago')
        WHEN DATEDIFF(NOW(), postedjobs.updated_at) < 7 THEN CONCAT(DATEDIFF(NOW(), postedjobs.updated_at), ' Days Ago')
        WHEN DATEDIFF(NOW(), postedjobs.updated_at) < 30 THEN CONCAT(FLOOR(DATEDIFF(NOW(), postedjobs.updated_at) / 7), ' Weeks Ago')
        WHEN DATEDIFF(NOW(), postedjobs.updated_at) < 365 THEN CONCAT(FLOOR(DATEDIFF(NOW(), postedjobs.updated_at) / 30), ' Months Ago')
        ELSE CONCAT(FLOOR(DATEDIFF(NOW(), postedjobs.updated_at) / 365), ' Years Ago')
    END AS time_ago, jobtypes.jobtype_name, locations.location_name,
    GROUP_CONCAT(skills.skill_name SEPARATOR ',') as skills
    FROM postedjobs
    LEFT JOIN companies ON postedjobs.company_id = companies.id
    LEFT JOIN locations ON locations.id = postedjobs.job_location_id
    LEFT JOIN jobtypes ON jobtypes.id = postedjobs.jobtype_id
    LEFT JOIN postedjobs_skills ON postedjobs.id = postedjobs_skills.posted_job_id
    LEFT JOIN skills ON skills.id = postedjobs_skills.skill_id
    WHERE 1=1
    """
    
    print(tag)
    params = []
    if job_title:
        query += " AND postedjobs.job_title LIKE %s"
        params.append(f"%{job_title}%")
    if location:
        query += " AND locations.location_name = %s"
        params.append(location)
    if job_type:
        query += " AND jobtypes.id = %s"
        params.append(job_type)
    if salary_range:
        query += " AND postedjobs.salary_range_id = %s"
        params.append(salary_range)
    if tag:
        query += " and postedjobs.job_title = %s"
        params.append(tag)

    query += " GROUP BY postedjobs.id"

    cursor.execute(query, params)
    featured_jobs = cursor.fetchall()
    cursor.close()
    connection.close()
    return featured_jobs


def get_companies(page=1, per_page=5):
    offset = (page - 1) * per_page
    connection = pymysql.connect(**db_config)
    cursor = connection.cursor()
    cursor.execute("SELECT COUNT(*) FROM companies")
    total_records = cursor.fetchone()[0]
    cursor.execute("SELECT * FROM companies LIMIT %s OFFSET %s", (per_page, offset))
    companies = cursor.fetchall()
    cursor.close()
    connection.close()
    return companies, total_records


def get_jobs():
    sql = '''
    SELECT companies.company_name, companies.company_email, postedjobs.job_title, jobtypes.jobtype_name, locations.location_name FROM ( (postedjobs INNER JOIN companies ON postedjobs.company_id = companies.id) INNER JOIN locations ON companies.id = locations.id) INNER JOIN jobtypes ON companies.id = jobtypes.id
       '''

def get_talents(job_title=None,location=None, tag = None, rating= None):
    connection = pymysql.connect(**db_config)
    cursor = connection.cursor()
    sql = """
            select candidates.id,
            candidates.fname,
            candidates.lname,
            candidates.professional_title,
            candidates.profile_pic,
            ROUND(avg(candidates_rating.rating), 1) as av_rating,
         GROUP_CONCAT(DISTINCT skills.skill_name SEPARATOR ',') AS skills
            from candidates       
            LEFT JOIN candidates_technicalskills ON candidates.id = candidates_technicalskills.candidate_id
            LEFT JOIN skills ON skills.id = candidates_technicalskills.skill_id
            left join candidates_rating on candidates.id = candidates_rating.candidate_id
            where 1=1
            GROUP BY candidates.id 
    """
    params = []
    if job_title:
        sql += " AND candidates.professional_title LIKE %s"
        params.append(f"%{job_title}%")
    if location:
        sql += " AND address = %s"
        params.append(location)
    if tag:
        sql += " AND candidates.professional_title = %s"
        params.append(tag)
    if rating:
        print(rating)
        sql += " HAVING av_rating >= %s"
        params.append(rating)
    sql+=" order by av_rating desc"
    cursor.execute(sql, params)
    devs = cursor.fetchall()
    cursor.close()
    connection.close()
    ldves = []
    for dev in devs:
        dev = list(dev)
        if dev[6]:
            dev[6] = dev[6].split(',')
        ldves.append(dev)
    return ldves

def candidates_locations():
    connection = pymysql.connect(**db_config)
    cursor = connection.cursor()
    cursor.execute("SELECT DISTINCT address FROM candidates ")
    locations = cursor.fetchall()
    cursor.close()
    connection.close()
    return locations

def developer_tags():
    connection = pymysql.connect(**db_config)
    cursor = connection.cursor()
    cursor.execute("SELECT professional_title, AVG(professional_title) as aver_cat FROM candidates GROUP BY professional_title ORDER BY aver_cat DESC limit 10")
    tags = cursor.fetchall()
    cursor.close()
    connection.close()
    return tags


def category_tags():
    sql = """SELECT job_title, AVG(job_title) as aver_cat FROM postedjobs 
        GROUP BY job_title
        ORDER BY aver_cat DESC limit 10"""
    connection = pymysql.connect(**db_config)
    cursor = connection.cursor()
    cursor.execute(sql)
    tags = cursor.fetchall()
    cursor.close()
    connection.close()
    return tags
from datetime import datetime, timedelta
import pytz

def time_ago(date):
    if date is None:
        return 'recently'
    
    now = datetime.now(pytz.utc)
    diff = now - date

    if diff.days >= 365:
        years = diff.days // 365
        return f'{years} Yr' if years > 1 else '1 Yr'
    elif diff.days >= 30:
        months = diff.days // 30
        return f'{months} M' if months > 1 else '1 M'
    elif diff.days > 0:
        return f'{diff.days} Day' if diff.days > 1 else '1 Day'
    elif diff.seconds >= 3600:
        hours = diff.seconds // 3600
        return f'{hours} Hr' if hours > 1 else '1 Hr'
    elif diff.seconds >= 60:
        minutes = diff.seconds // 60
        return f'{minutes} Min' if minutes > 1 else '1 Min'
    else:
        return 'Now'
    


def get_candidates():
    connection = pymysql.connect(**db_config)
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM candidates")
    candidates = cursor.fetchall()
    cursor.close()
    connection.close()
    return candidates