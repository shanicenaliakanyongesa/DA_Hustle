from flask import *
from functions import *
import math
from functools import wraps


app = Flask(__name__)
app.secret_key = "jhvahsfgjsgosh.jfa/plj"

# Database configuration
db_config = {
    'user': 'root',
    'password': '',
    'host': 'localhost',
    'database': 'hustle_db'
}

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'key' not in session:
            flash('Kindly login to access this page.', 'danger')
            return redirect(url_for('choose'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def home():
    locations = get_locations()
    jobType = get_jobType()
    salaryRange = get_salaryRange()
    candidates = get_candidates()
    developertags = developer_tags()
    categories = category_tags()
    companies, total_records = get_companies(page=1, per_page=5)  # Initial load, first 5 companies
    total_pages = (total_records + 4) // 5  # Calculate total pages (5 items per page)
    featured_jobs = get_featured_jobs()
    return render_template('home.html', locations=locations, jobtypes=jobType, salaryranges=salaryRange, categories=categories, companies=companies, total_pages=total_pages, postedjobs = featured_jobs, candidates=candidates)
@app.route('/candidate/dashboard')
def candidate_dashboard():
    return render_template('candidate/dashboard.html')

@app.route('/search', methods=['POST'])
def search():
    job_title = request.form.get('job_title')
    location = request.form.get('location')
    job_type = request.form.get('job_type')
    salary_range = request.form.get('search_salary')
    page = int(request.form.get('currentPage', 1))
    tag = request.form.get('tag')
    print(tag)
    if tag == "None" or tag == "":
        tag = None
    if location == "None" or location == "Select Location":
        location = None
    if job_type == "None" or location == "Job Type":
        job_type = None
    
    featured_jobs = get_featured_jobs(job_title=job_title, location=location, job_type=job_type, salary_range=salary_range, tag=tag)
    per_page = 4
    pages = math.ceil(len(featured_jobs) / per_page)
    start = (page - 1) * per_page
    end = start + per_page
    paginated_data = featured_jobs[start:end]
    return jsonify({'htmlresponse': render_template('components/response.html', postedjobs=paginated_data, page = page, per_page =per_page, total = pages  )})



@app.route('/find-jobs')
def findJobs():
    locations = get_locations()
    jobType = get_jobType()
    salaryRange = get_salaryRange()
    mycompanies = get_allcompanies()
    companies, total_records = get_companies(page=1, per_page=5)  # Initial load, first 5 companies
    total_pages = (total_records + 4) // 5  # Calculate total pages (5 items per page)
    featured_jobs = get_featured_jobs()
    return render_template('find-jobs.html', locations=locations, jobtypes=jobType, salaryranges=salaryRange, companies=companies, total_pages=total_pages, postedjobs = featured_jobs, mycompanies=mycompanies)




@app.route('/find-talent')
def findTalent():
    candidates = get_talents()
    locations = candidates_locations()
    developertags = developer_tags()
    developertags = developer_tags()

    return render_template('find-talent.html',candidates=candidates,locations=locations,developertags=developertags)

@app.route('/choose')
def choose():
    return render_template('choose.html')

@app.route('/candidate/register', methods = ['POST', 'GET'])
def candidateReg():
    if request.method == 'POST':
        email = request.form['email']
        firstname = request.form['fname']
        surname = request.form['surname']
        password = request.form['password']
        confirm = request.form['password_confirmation']

        connection = pymysql.connect(host='localhost', user='root',password='', database='hustle_db' )
        cursor = connection.cursor()

        data = (email, firstname, surname, hash_password(password))
        sql = ''' insert into candidates (email, fname, surname, password) values (%s, %s, %s, %s) '''

        if len(email) <= 0:
            return render_template('candidate/register.html', error1 = 'Email Cannot be Empty')
        
        elif len(firstname) <= 0:
            return render_template('candidate/register.html', error2 = 'First Name Cannot be Empty')
        
        elif len(surname) <= 0:
            return render_template('candidate/register.html', error3 = 'Surname Cannot be Empty')
        
        elif len(password) <= 0:
            return render_template('candidate/register.html', error4 = 'Password Cannot be Empty')
        
        elif len(password) < 8:
            return render_template('candidate/register.html', error5 = 'Password Less Than 8 Characters')
        
        elif password != confirm:
            return render_template('candidate/register.html', error6 = 'Password Not Matching')
        
        else:
            try:
                cursor.execute(sql, data)
                connection.commit()
                return render_template('candidate/register.html', success = 'Candidate Registered')
            except:
                connection.rollback()
                return render_template('candidate/register.html', warning = 'Something Went Wrong')
    else:
        return render_template('candidate/register.html', message = "Sign-up Below")


@app.route('/candidate/login', methods = ['POST', 'GET'])
def candidateLogin():
    if request.method == 'POST':
        candidate_email = request.form['email']
        candidate_password = request.form['password']

        sql = 'select * from candidates where email = %s'

        connection = pymysql.connect(host='localhost', user='root',password='', database='hustle_db' )
        cursor = connection.cursor()
        cursor.execute(sql, candidate_email)

        count = cursor.rowcount
        if count == 0:
            return render_template('candidate/login.html', error = 'Candidate Email not Found')
        else:
            candidate = cursor.fetchone()
            hashed_password = candidate[6]
            if hash_verify(candidate_password, hashed_password):
                session['key'] = candidate[0]
                session['email'] = candidate[1]
                session['fname'] = candidate[2]
                session['surname'] = candidate[4]
                session['candidate_profile_pic'] = candidate[8]

                return redirect('/candidate/dashboard')
            
            else:
                return render_template('candidate/login.html', error = 'Password Not Found')
    else:
        return render_template('candidate/login.html', message = 'Login Below')


@app.route('/search_talent', methods=['POST'])
def search_talent():

    if request.form.get('job_title') != "None":

        job_title = request.form.get('job_title')
    else:
        job_title=None
    location = request.form.get('location')
    tag = request.form.get('tag')
    page = int(request.form.get('currentPage', 1))
    if tag == "None" or tag == "":
        tag = None
    rating = request.form.get('rating')
    if rating == "None" or rating == "" or not(rating):
        rating = None
    # else: 
    #     rating = float(rating)
    if location == "None" or location == "Select Location":
        location = None
    
    candidates = get_talents(job_title=job_title, location=location, tag=tag, rating=rating)
    per_page = 24
    pages = math.ceil(len(candidates) / per_page)
    start = (page - 1) * per_page
    end = start + per_page
    paginated_data = candidates[start:end]
    
    return jsonify({'htmlresponse': render_template('components/devs_response.html', candidates=paginated_data, page = page, per_page =per_page, total = pages  )})

@app.route('/company/register',  methods = ['POST', 'GET'])
def companyReg():
    if request.method == 'POST':
        company_email = request.form['company_email']
        company_name = request.form['company_name']
        password = request.form['password']
        confirm = request.form['password_confirmation']

        connection = pymysql.connect(host='localhost', user='root',password='', database='hustle_db' )
        cursor = connection.cursor()

        data = (company_name,company_email,hash_password(password))

        sql = ''' insert into companies (company_name, company_email, password) values (%s, %s, %s) '''

        if len(company_email) <= 0:
            return render_template('company/register.html', error1 = 'Email Cannot be Empty')
        
        elif len(company_name) <= 0:
            return render_template('company/register.html', error2 = 'Company Name Cannot be Empty')    

        elif len(password) <= 0:
            return render_template('company/register.html', error3 = 'Password Cannot be Empty')
        
        elif len(password) < 8:
            return render_template('company/register.html', error4 = 'Password Less Than 8 Characters')
        
        elif password != confirm:
            return render_template('company/register.html', error5 = 'Password Not Matching')
        
        else:
            try:
                cursor.execute(sql, data)
                connection.commit()
                return render_template('company/register.html', success = 'Company Registered')
            except:
                connection.rollback()
                return render_template('company/register.html', warning = 'Something Went Wrong')

    else:
        return render_template('company/register.html', message = "Register Your Company Below")
    


@app.route('/company/login', methods = ['POST', 'GET'])
def companyLogin():
    if request.method == 'POST':
        company_email = request.form['company_email']
        company_password = request.form['password']

        sql = 'select * from companies where company_email = %s'

        connection = pymysql.connect(host='localhost', user='root',password='', database='hustle_db' )
        cursor = connection.cursor()
        cursor.execute(sql, company_email)

        count = cursor.rowcount
        if count == 0:
            return render_template('company/login.html', error = 'Company Email not Found')
        else:
            company = cursor.fetchone()
            hashed_password = company[9]
            if hash_verify(company_password, hashed_password):
                session['key'] = company[1]
                session['id'] = company[0]

                return redirect(url_for('company_dashboard'))
            else:
                return render_template('company/login.html', error = 'Invalid Password')
    else:
        return render_template('company/login.html', message = 'Login To Company Account')
    



@app.route('/candidate/profile')
def candidate_profile():
    if 'key' in session:
        # User Profile
        connection = pymysql.connect(host='localhost', user='root',password='', database='hustle_db' )
        sql2 = "select * from candidates where id = %s"
        cursor2 = connection.cursor()
        cursor2.execute(sql2, session['key'])
        candidate = cursor2.fetchone()

        session['fname'] = candidate[2]
        session['lname'] = candidate[3]
        session['surname'] = candidate[4]
        session['phone'] = candidate[5]
        session['title'] = candidate[9]
        session['gender'] = candidate[10]
        session['dob'] = candidate[11]
        session['national_id_no'] = candidate[12]
        session['address'] = candidate[13]
        session['bio'] = candidate[14]
        return render_template('candidate/components/profile.html')
    else:
        return redirect('/candidate/login')
    

@app.route('/company/dashboard')
@login_required
def company_dashboard():
   return render_template('company/dashboard.html')

@app.route('/company/profile')
@login_required
def company_profile():
    return render_template('/company/company-profile.html')

@app.route('/company/postjob',methods=['POST','GET'])
@login_required
def postjob():
    connection = pymysql.connect(**db_config)
    cursor = connection.cursor()
    if request.method == 'POST':
        job_title = request.form.get('job_title')
        job_location_id = request.form.get('job_location_id')
        jobtype_id = request.form.get('jobtype_id')
        salary_range_id = request.form.get('salary_range_id')
        job_skills = request.form.getlist('job_skills[]')  
        job_description = request.form.get('job_description')
        company_id=session['id']
        
        if len(job_title) <= 0:
            flash('Job Title Cannot be Empty','danger')
            return redirect(url_for('postjob'))
        if len(job_location_id) <= 0:
            flash('Job Location Cannot be Empty','danger')
            return redirect(url_for('postjob'))
        if len(jobtype_id) <= 0:
            flash('Job Type Cannot be Empty','danger')
            return redirect(url_for('postjob'))
        if len(salary_range_id) <= 0:
            flash('Salary Range Cannot be Empty','danger')
            return redirect(url_for('postjob'))
        if len(job_skills) <= 0:
            flash('Job Skills Cannot be Empty','danger')
            return redirect(url_for('postjob'))
        if len(job_description) <= 0:
            flash('Job Description Cannot be Empty','danger')
            return redirect(url_for('postjob'))
        else:
            job_data = (job_title, job_location_id, jobtype_id, salary_range_id, job_description,company_id)
            job_sql = 'INSERT INTO postedjobs (job_title, job_location_id, jobtype_id, salary_range_id, job_description,company_id) VALUES (%s, %s, %s, %s, %s, %s)'
            cursor.execute(job_sql, job_data)
            connection.commit()

            # Get the last inserted job id
            posted_job_id = cursor.lastrowid

            skill_sql = 'INSERT INTO  postedjobs_skills (posted_job_id, skill_id) VALUES (%s, %s)'
            for skill_id in job_skills:
                cursor.execute(skill_sql, (posted_job_id, skill_id))
            connection.commit()
            flash("Job Posted Successfully", 'success')
            return redirect(url_for('postjob'))
    else:
        locations = get_job_locations()
        jobType = get_jobType()
        salaryRange = get_salaryRange()
        skills=get_skills()
        return render_template('company/post-jobs.html',locations=locations,jobType=jobType,salaryRange=salaryRange,skills=skills)

@app.route('/company/applications')
@login_required
def company_applications():
    return render_template('/company/applications.html')


@app.route('/company/logout')
def companylogout():
    session.clear()
    return redirect('/company/login')


@app.route('/logout')
def logout():
    session.clear()
    return redirect('/candidate/login')

# comment# about us
@app.route('/aboutus')
def about():
    return render_template('about.html')

# update bio
@app.route('/candidate/update-bio',  methods = ['POST', 'GET'])
def update_bio():
    if 'key' in session:
        if request.method == 'POST':
            firstname = request.form['fname']
            lastname = request.form['lname']
            surname = request.form['surname']
            phone = request.form['phone']
            title = request.form['title']
            gender = request.form['gender']
            dob = request.form['dob']
            national_id_no = request.form['national_id_no']
            address = request.form['address']
            bio = request.form['bio']

            connection = pymysql.connect(host='localhost', user='root',password='', database='hustle_db' )
            cursor = connection.cursor()

            data = (firstname, lastname, surname, phone, title, gender, dob, national_id_no, address, bio, session['key'])

            sql = "update candidates set fname = %s, lname = %s, surname = %s, phone = %s, professional_title = %s, gender = %s, dob = %s, national_id_no = %s, address = %s, bio = %s where id = %s"
            cursor.execute(sql, data)
            connection.commit()

            
            

            return render_template('candidate/components/profile.html', success = 'Bio Updated Successfully')

        else:
            return render_template('candidate/components/profile.html')
            
    else:
        return redirect('/candidate/login')
    
@app.route('/candidate2/dashboard')
def candidate2():
    return render_template('candidate2/candidate/dashboard/dashboard.html')

@app.route('/candidate2/profile')
def candidate_profile2():
    return render_template('candidate2/candidate/profile/general.html')
@app.route('/candidate2/career')
def career_info():
    return render_template('candidate2/candidate/profile/career-information.html') 
@app.route('/candidate2/cv')
def cv():
    return render_template('candidate2/candidate/profile/cv_template.html') 
@app.route('/candidate2/resume')
def resume():
    return render_template('candidate2/candidate/profile/resume.html') 
@app.route('/candidate2add')
def resume():
    return render_template('candidate2/candidate/profile/resume.html') 



if __name__ == '__main__':
    app.debug = True
    app.run()