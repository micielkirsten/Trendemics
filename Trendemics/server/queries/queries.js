//require('../models/regions')

const QUERIES = {

    REGIONS: `SELECT ID, LOCATION FROM REGIONS`,//`SELECT` + Region.ID + `FROM` + Region.tableName,
    RACES: `SELECT CASE_MONTH, num_age_cases/total_num_cases as case_rate FROM "LINDSEY.HANNAH".RACES`,
    POPULATIONS: `SELECT * FROM POPULATIONS`,
    VACCINATIONS: `SELECT V_DATE, NEW_VACCINE_DOSES_ADMINISTERED 
                        FROM VACCINATIONS 
                        WHERE V_DATE >= '01-JAN-21' AND V_DATE < '01-MAR-21'`,
    COVID_CASES: `SELECT * FROM COVID_CASES`,
    GOVERNMENT_RESPONSES: `SELECT * FROM GOVERNMENT_RESPONSES`,
    
    AGE_QUERY:`SELECT age_case_month, num_age_cases/total_num_cases as case_rate
    FROM
        (SELECT case_month as age_case_month, COUNT(caseid) as num_age_cases
        FROM "LINDSEY.HANNAH".races
        WHERE res_state = 'NC'
        AND age_group = '65+ years'
        GROUP BY case_month
        ORDER BY case_month asc),
        (SELECT case_month as total_case_month, COUNT(caseid) as total_num_cases
        FROM "LINDSEY.HANNAH".races
        WHERE res_state = 'NC'
        GROUP BY case_month
        ORDER BY case_month asc)
    WHERE age_case_month = total_case_month AND ROWNUM <= 1000`,

    /*
    1. Monitor the covid vaccine distribution over time, how have the vaccination rates 
correlated with changes in case rates? 
    */
   /*WHERE location = user_country_input*/
    VACCINE_QUERY: 
    `SELECT v_date, AVG(new_vaccine_doses_administered/population) as vaccination_rate
    FROM populations,
        (SELECT region_id as vacc_region_id, v_date, new_vaccine_doses_administered
        FROM vaccinations
        WHERE v_date >= '01-JAN-21' AND v_date < '01-JAN-22'),
        (SELECT id, location
        FROM regions
        WHERE location = 'Austria')
    WHERE vacc_region_id = id AND ROWNUM <= 1000
    AND population > 0
    GROUP BY v_date`,

    AUSTRIA_TEST: 
    `SELECT v_date, AVG(new_vaccine_doses_administered/population) as vaccination_rate
    FROM "MARINA.TUCKER".populations,
        (SELECT region_id as vacc_region_id, v_date, new_vaccine_doses_administered
        FROM "MARINA.TUCKER".vaccinations),
        (SELECT id, location
        FROM "MARINA.TUCKER".regions
        WHERE location = 'Austria')
    WHERE vacc_region_id = id and rownum <= 100
    AND location = 'Austria'
    AND population > 0
    GROUP BY v_date`,

    VAR_TEST://only working query with variables, it's basically the test for query 1
    `SELECT v_date, AVG(new_vaccine_doses_administered/population) as vaccination_rate
    FROM populations,
        (SELECT region_id as vacc_region_id, v_date, new_vaccine_doses_administered
        FROM vaccinations
        WHERE v_date >= '01-JAN-20' AND v_date < '01-JAN-22'),
        (SELECT id, location
        FROM regions
        WHERE location = :val)
    WHERE vacc_region_id = id AND ROWNUM <= 1000
    AND population > 0
    GROUP BY v_date`,

    VAR_TEST2: `SELECT v_date, AVG(new_vaccine_doses_administered/population) as vaccination_rate
    FROM populations,
        (SELECT region_id as vacc_region_id, v_date, new_vaccine_doses_administered
        FROM vaccinations),
        (SELECT id, location
        FROM regions
        WHERE location = :val)
    WHERE vacc_region_id = id AND ROWNUM <= 1000
    AND population > 0
    GROUP BY v_date`
,
    QUERY_1: `SELECT v_date, (vaccination_rate/case_rate) as vaccine_correlation_factor
FROM
    (SELECT v_date, AVG(new_vaccine_doses_administered/population) as vaccination_rate
    FROM "MARINA.TUCKER".populations,
        (SELECT region_id as vacc_region_id, v_date, new_vaccine_doses_administered
        FROM "MARINA.TUCKER".vaccinations),
        (SELECT id, location
        FROM "MARINA.TUCKER".regions
        WHERE location = :country)
    WHERE vacc_region_id = id
    AND location = :country
    AND population > 0
    GROUP BY v_date),
    (SELECT cc_date, AVG(new_confirmed/population) as case_rate
    FROM "MARINA.TUCKER".populations,
        (SELECT region_id as covid_region_id, cc_date, new_confirmed
        FROM "MARINA.TUCKER".covid_cases),
        (SELECT id, location
        FROM "MARINA.TUCKER".regions
        WHERE location = :country)
    WHERE covid_region_id = id
    AND location = :country
    AND population > 0
    GROUP BY cc_date)
WHERE v_date = cc_date
AND ROWNUM <= 2000`,

    QUERY_1a:
    `SELECT v_date, (vaccination_rate/case_rate) as vaccine_correlation_factor
    FROM
        (SELECT v_date, AVG(new_vaccine_doses_administered/population) as vaccination_rate
        FROM "MARINA.TUCKER".populations,
            (SELECT region_id as vacc_region_id, v_date, new_vaccine_doses_administered
            FROM "MARINA.TUCKER".vaccinations),
            (SELECT id, location
            FROM "MARINA.TUCKER".regions
            WHERE location = 'Austria')
        WHERE vacc_region_id = id
        AND location = 'Austria'
        AND population > 0
        GROUP BY v_date),
        (SELECT cc_date, AVG(new_confirmed/population) as case_rate
        FROM "MARINA.TUCKER".populations,
            (SELECT region_id as covid_region_id, cc_date, new_confirmed
            FROM "MARINA.TUCKER".covid_cases),
            (SELECT id, location
            FROM "MARINA.TUCKER".regions
            WHERE location = 'Austria')
        WHERE covid_region_id = id
        AND location = 'Austria'
        AND population > 0
        GROUP BY cc_date)
    WHERE v_date = cc_date`,

    
    QUERY_2: `SELECT gr_date, AVG(stringency_index)
    FROM "MARINA.TUCKER".populations,
        (SELECT region_id as gr_region_id, stringency_index, gr_date
        FROM "MARINA.TUCKER".government_responses),
        (SELECT id, location
        FROM "MARINA.TUCKER".regions
        WHERE location = :val)
    WHERE gr_region_id = id
    AND location = :val
    AND population > 0
    GROUP BY gr_date`,

    QUERY_2B: `SELECT * FROM GOVERNMENT_RESPONSES`,

    //needs variables
    QUERY_3: `SELECT age_case_month, num_age_cases/total_num_cases as case_rate
    FROM
        (SELECT case_month as age_case_month, COUNT(caseid) as num_age_cases
        FROM "LINDSEY.HANNAH".races
        WHERE res_state = :state
        AND age_group = :age
        GROUP BY case_month
        ORDER BY case_month asc),
        (SELECT case_month as total_case_month, COUNT(caseid) as total_num_cases
        FROM "LINDSEY.HANNAH".races
        WHERE res_state = :state
        GROUP BY case_month
        ORDER BY case_month asc)
    WHERE age_case_month = total_case_month`,

    //needs variables
    QUERY_4: `SELECT race_case_month, num_race_cases/total_num_cases as case_rate
    FROM
        (SELECT case_month as race_case_month, COUNT(caseid) as num_race_cases
        FROM "LINDSEY.HANNAH".races
        WHERE res_state = :state
        AND race = :race
        GROUP BY case_month
        ORDER BY case_month asc),
        (SELECT case_month as total_case_month, COUNT(caseid) as total_num_cases
        FROM "LINDSEY.HANNAH".races
        WHERE res_state = :state
        GROUP BY case_month
        ORDER BY case_month asc)
    WHERE race_case_month = total_case_month`,

    //needs additional variable for mobility
    QUERY_5: `SELECT mp_date, AVG(:mobility)
    FROM "MARINA.TUCKER".populations,
        (SELECT region_id as mp_region_id, :mobility, mp_date
        FROM "MARINA.TUCKER".mobility),
        (SELECT id."MARINA.TUCKER".regions, location
        FROM "MARINA.TUCKER".regions
        WHERE location = :val)
    WHERE mp_region_id = id."MARINA.TUCKER".regions
    AND location = :val
    GROUP BY mp_date`,

    QUERY_5a: `SELECT mp_date, AVG(grocery_pharmacy)
    FROM "MARINA.TUCKER".populations,
        (SELECT region_id as mp_region_id, grocery_pharmacy, mp_date
        FROM "MARINA.TUCKER".mobility),
        (SELECT location
        FROM "MARINA.TUCKER".regions
        WHERE location = 'Austria')
    GROUP BY mp_date`,


    

    /* Main page query to count number of tuples 
Should = 9937889 */
    TOTAL_TUPLES:
`SELECT (covid_cases_count + economies_count + government_responses_count + populations_count + mobility_count + public_health_count + regions_count + vaccinations_count + races_count) as total_count
FROM
    (SELECT COUNT(*) as covid_cases_count
    FROM "MARINA.TUCKER".covid_cases),
    (SELECT COUNT(*) as economies_count
    FROM "MARINA.TUCKER".economies),
    (SELECT COUNT(*) as government_responses_count
    FROM "MARINA.TUCKER".government_responses),
    (SELECT COUNT(*) as populations_count
    FROM "MARINA.TUCKER".populations),
    (SELECT COUNT(*) as mobility_count
    FROM "MARINA.TUCKER".mobility),
    (SELECT COUNT(*) as public_health_count
    FROM "MARINA.TUCKER".public_health),
    (SELECT COUNT(*) as regions_count
    FROM "MARINA.TUCKER".regions),
    (SELECT COUNT(*) as vaccinations_count
    FROM "MARINA.TUCKER".vaccinations),
    (SELECT COUNT(*) as races_count
    FROM "LINDSEY.HANNAH".races)`,

    GET_AGES:
    `SELECT DISTINCT(AGE_GROUP) FROM "LINDSEY.HANNAH".RACES ORDER BY AGE_GROUP ASC`,

    GET_STATES:
    `SELECT DISTINCT(RES_STATE) FROM "LINDSEY.HANNAH".RACES ORDER BY RES_STATE ASC`,

    GET_RACES:
    `SELECT DISTINCT(RACE) FROM "LINDSEY.HANNAH".RACES ORDER BY RACE ASC`,

    GET_MOBILITY:
    `SELECT TRANSIT_STATIONS, GROCERY_PHARMACY, PARKS, RESIDENTIAL, RETAIL_RECREATION, WORKPLACES, PARKS FROM MOBILITY.columns`
}
module.exports = QUERIES;