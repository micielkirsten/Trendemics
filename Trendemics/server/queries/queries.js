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

    VAR_TEST:
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
}
module.exports = QUERIES;