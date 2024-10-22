{% extends 'candidate/profile/index.html' %}

{% block css %}
    <link href="../../../../static/assets/css/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css"/>
{% endblock %}

{% block section %}
    <div class="mb-xl-8">
        <div class="border-0">
            <div class="d-md-flex align-items-center justify-content-between mb-5 mx-3">
                <h1 class="mb-0">Candidate Experience</h1>
                <div class="text-end mt-4 mt-md-0">
                    <a
                        class="btn btn-primary form-btn addExperienceModal" data-bs-toggle="modal"
                        data-bs-target="#addExperienceModal">Add Experience</a>
                </div>
            </div>

            <div class="pt-0 fs-6 py-8 px-3 text-gray-700">
                <input type="hidden" id="candidatePresentMsg" value="Present">
                <div class="row">
                    <div class="candidate-experience-container">
                        <div class="col-12 {{ 'd-none' if data['candidateExperiences']|length > 0 else '' }}"
                             id="notfoundExperience">
                            <h5 class="product-item pb-5 d-flex justify-content-center text-gray-600">
                                No Experience Found
                            </h5>
                        </div>
                        {% for candidateExperience in data['candidateExperiences'] %}
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 candidate-experience rounded shadow p-5 mb-5 card"
                                 data-experience-id="{{ loop.index }}" data-id="{{ candidateExperience.id }}">
                                <article class="article article-style-b">
                                    <div class="article-details">
                                        <div class="d-flex justify-content-between">
                                            <div class="article-title">
                                                <h4 class="text-primary">{{ candidateExperience.experience_title }}</h4>
                                                <h6 class="text-muted">{{ candidateExperience.company }}</h6>
                                            </div>
                                            <div class="article-cta candidate-experience-edit-delete">
                                                <a href="javascript:void(0)"
                                                   class="edit-candidate-experience btn px-2 text-primary fs-3 ps-0"
                                                   title="Edit" data-bs-toggle="tooltip"
                                                   data-id="{{ candidateExperience.id }}"><i
                                                        class="fa-solid fa-pen-to-square"></i></a>
                                                <a href="javascript:void(0)"
                                                   class="delete-experience btn px-2 text-danger fs-3 pe-0"
                                                   title="Delete" data-bs-toggle="tooltip"
                                                   data-id="{{ candidateExperience.id }}"><i class="fa-solid fa-trash"></i></a>
                                            </div>
                                        </div>
                                        <span class="text-muted">{{ candidateExperience.start_date.strftime('%d %b, %Y') }} - </span>
                                        {% if candidateExperience.currently_working %}
                                            <span class="text-muted">Present</span>
                                        {% else %}
                                            <span class="text-muted">{{ candidateExperience.end_date.strftime('%d %b, %Y') }}</span>
                                        {% endif %}
                                        <span class="text-muted"> | {{ candidateExperience.country }}</span>
                                        {% if candidateExperience.description %}
                                            <p class="mb-0 pb-md-0 pb-4">{{ candidateExperience.description|truncate(225, True, '...') }}</p>
                                        {% endif %}
                                    </div>
                                </article>
                            </div>
                        {% endfor %}
                    </div>
                </div>
            </div>
        </div>

        <div class="border-0 pt-6">
            <div class="d-md-flex align-items-center justify-content-between mb-5 mx-3">
                <h1 class="mb-0">Education</h1>
                <div class="text-end mt-4 mt-md-0">
                    <a
                        class="btn btn-primary form-btn addEducationModal" data-bs-toggle="modal"
                        data-bs-target="#addEducationModal">Add Education</a>
                </div>
            </div>
            <div class="pt-0 fs-6 py-8 px-3 text-gray-700">
                <div class="row">
                    <div class="candidate-education-container">
                        <div class="col-12 {{ 'd-none' if data['candidateEducations']|length > 0 else '' }}"
                             id="notfoundEducation">
                            <h5 class="product-item pb-5 d-flex justify-content-center text-gray-600">
                                No Education Found
                            </h5>
                        </div>
                        {% for candidateEducation in data['candidateEducations'] %}
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 candidate-education shadow rounded p-5 mb-5 card"
                                 data-education-id="{{ loop.index }}" data-id="{{ candidateEducation.id }}">
                                <article class="article article-style-b">
                                    <div class="article-details">
                                        <div class="d-flex justify-content-between">
                                            <div class="article-title">
                                                <h4 class="text-primary education-degree-level">{{ candidateEducation.degreeLevel.name }}</h4>
                                                <h6 class="text-muted">{{ candidateEducation.degree_title }}</h6>
                                            </div>
                                            <div class="article-cta candidate-education-edit-delete">
                                                <a href="javascript:void(0)"
                                                   class="btn px-2 text-primary fs-3 ps-0 edit-candidate-education"
                                                   title="Edit" data-bs-toggle="tooltip"
                                                   data-id="{{ candidateEducation.id }}"><i
                                                        class="fa-solid fa-pen-to-square"></i></a>
                                                <a href="javascript:void(0)"
                                                   class="delete-education btn px-2 text-danger fs-3 pe-0"
                                                   title="Delete" data-bs-toggle="tooltip"
                                                   data-id="{{ candidateEducation.id }}"><i class="fa-solid fa-trash"></i></a>
                                            </div>
                                        </div>
                                        <span class="text-muted">{{ candidateEducation.year }} | {{ candidateEducation.country }}</span>
                                        <p class="mb-0 pb-md-0 pb-4">{{ candidateEducation.institute }}</p>
                                    </div>
                                </article>
                            </div>
                        {% endfor %}
                    </div>
                </div>
            </div>
        </div>

        {% include 'candidate/profile/modals/add_experience_modal.html' %}
        {% include 'candidate/profile/modals/add_education_modal.html' %}
        {% include 'candidate/profile/modals/edit_experience_modal.html' %}
        {% include 'candidate/profile/modals/edit_education_modal.html' %}
        {% include 'candidate/profile/templates/templates.html' %}
        <input type="hidden" id="indexCareerInfoData" value="true">
    </div>
{% endblock %}

{% block scripts %}
    <script>
        // let addExperienceUrl = "../../../../../candidate/create-experience";
        // let experienceUrl = "../../../../../candidate/candidate-experience/";
        // let addEducationUrl = "../../../../../candidate/create-education";
        // let candidateUrl = "../../../../../candidate/";
        // let educationUrl = "../../../../../candidate/candidate-education/";
        // let present = "Present";
        // let isEdit = false;
    </script>
    <script src="../../../../static/assets/js/moment.min.js"></script>
    <script src="../../../../static/assets/js/bootstrap-datetimepicker.min.js"></script>
    <script src="../../../../static/assets/js/candidate-profile/candidate_career_informations.js"></script>
{% endblock %}
