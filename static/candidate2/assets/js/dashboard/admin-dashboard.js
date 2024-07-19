document.addEventListener('turbo:load', loadAdminDashboardData);

function loadAdminDashboardData () {

    if (!$('#weeklyUserBarChartContainer').length) {
        return;
    }
    let timeRange = $('#timeRange');
    let isPickerApply = false;
    const today = moment();
    let start = today.clone().startOf('week');
    let end = today.clone().endOf('days');
    timeRange.on('apply.daterangepicker', function (ev, picker) {
        isPickerApply = true;
        start = picker.startDate.format('YYYY-MM-D  H:mm:ss');
        end = picker.endDate.format('YYYY-MM-D  H:mm:ss');
        loadDashboardData(start, end);
    });

    const lastMonth = moment().startOf('month').subtract(1, 'days');
    const thisMonthStart = moment().startOf('week');
    const thisMonthEnd = moment().endOf('week');

    window.cb = function (start, end) {
        timeRange.find('span').
            html(
                start.format('MMM D, YYYY') + ' - ' +
                end.format('MMM D, YYYY'));
    };

    timeRange.daterangepicker({
        startDate: start,
        endDate: end,
        opens: 'left',
        showDropdowns: true,
        autoUpdateInput: false,
        locale: {
            customRangeLabel: Lang.get('js.custom'),
            applyLabel: Lang.get('js.apply'),
            cancelLabel: Lang.get('js.cancel'),
            fromLabel: Lang.get('js.from'),
            toLabel: Lang.get('js.to'),
            monthNames: [
                Lang.get('js.jan'),
                Lang.get('js.feb'),
                Lang.get('js.mar'),
                Lang.get('js.apr'),
                Lang.get('js.may'),
                Lang.get('js.jun'),
                Lang.get('js.jul'),
                Lang.get('js.aug'),
                Lang.get('js.sep'),
                Lang.get('js.oct'),
                Lang.get('js.nov'),
                Lang.get('js.dec')
            ],

            daysOfWeek: [
                Lang.get('js.sun'),
                Lang.get('js.mon'),
                Lang.get('js.tue'),
                Lang.get('js.wed'),
                Lang.get('js.thu'),
                Lang.get('js.fri'),
                Lang.get('js.sat')],
        },
        ranges: {
            [Lang.get('js.this_week')]: [moment().startOf('week'), moment().endOf('week')],
            [Lang.get('js.last_week')]: [
                moment().startOf('week').subtract(7, 'days'),
                moment().startOf('week').subtract(1, 'days')],
        },
    }, cb);

    cb(start, end);

    window.loadDashboardData = function (startDate, endDate) {
        $.ajax({
            type: 'GET',
            url: route('dashboard.chart.data'),
            dataType: 'json',
            data: {
                start_date: startDate,
                end_date: endDate,
            },
            cache: false,
        }).done(
            WeeklyBarChart,
            PostStatistics,
        );
    };

    window.WeeklyBarChart = function (result) {
        $('#weeklyUserBarChartContainer').html('');
        $('canvas#weeklyUserBarChart').remove();
        $('#weeklyUserBarChartContainer').
            append(
                '<canvas id="weeklyUserBarChart" width="515" height="400"></canvas>');

        let data = result.data.weeklyChartData;
        const weeklyData = {
            labels: data.weeklyLabels,
            datasets: [
                {
                    label: Lang.get('js.employer'),
                    backgroundColor: '#7239ea',
                    data: data.totalEmployerCount,
                }, {
                    label: Lang.get('js.candidate'),
                    backgroundColor: '#109ef7',
                    data: data.totalCandidateCount,
                }],
        };
        let ctx = $('#weeklyUserBarChart');
        let config = new Chart(ctx, {
            type: 'bar',
            data: weeklyData,
            options: {
                scales: {
                    xAxes: [
                        {
                            stacked: true,
                            gridLines: {
                                display: false,
                            },
                        }],
                    yAxes: [
                        {
                            stacked: true,
                            ticks: {
                                min: 0,
                                precision: 0,
                            },
                            type: 'linear',
                        }],
                },
            },
        });
    };

    window.PostStatistics = function (result) {
        $('#postStatisticsChartContainer').html('');
        $('canvas#postStatisticsChart').remove();
        $('#postStatisticsChartContainer').
            append(
                '<canvas id="postStatisticsChart" width="515" height="400"></canvas>');

        let data = result.data.postStatisticsChartData;
        const postStatisticsLineChartData = {
            labels: data.weeklyPostLabels,
            datasets: [
                {
                    label: 'Posts',
                    data: data.totalPostCount,
                    backgroundColor: '#109ef7',
                    borderColor: '#109ef7',
                    hoverOffset: 4,
                    pointRadius: 5,
                    pointHoverRadius: 5,
                    fill: false,
                    tension: 0.1,
                }],
        };

        let postStatistics = $('#postStatisticsChart');

        let myChart = new Chart(postStatistics, {
            type: 'line',
            data: postStatisticsLineChartData,
            options: {
                legend: false,
                scales: {
                    xAxes: [
                        {
                            stacked: true,
                            gridLines: {
                                display: false,
                            },
                        }],
                    yAxes: [
                        {
                            stacked: true,
                            ticks: {
                                min: 0,
                                precision: 0,
                            },
                            type: 'linear',
                        }],
                },
            }
        });
    }
    if (start !== null) {
        loadDashboardData(start.format('YYYY-MM-D H:mm:ss'),
            end.format('YYYY-MM-D H:mm:ss'));
    }
    let applyBtn = $('.range_inputs > button.applyBtn');
    if (applyBtn.length) {
        $(document).on('click', '.ranges li', function () {
            if ($(this).data('range-key') === 'Custom Range') {
                applyBtn.css('display', 'initial');
            } else {
                applyBtn.css('display', 'none');
            }
        });
        applyBtn.css('display', 'none');
    }
}
