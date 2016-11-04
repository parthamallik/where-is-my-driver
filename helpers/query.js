exports.sqls = {
    'updateDriver' : 'INSERT INTO driver_loc (ID, location, ACCURACY) VALUES (#id#, ST_GeographyFromText(\'SRID=4326;POINT(#longitude# #latitude#)\'), #accuracy# ) ON CONFLICT(ID) DO UPDATE set location = EXCLUDED.location, accuracy = EXCLUDED.accuracy',

    'findDriver' : 'SELECT id, ST_X(ST_AsText(location)) as longitude, ST_Y(ST_AsText(location)) as latitude, ST_Distance(location, ST_GeographyFromText(\'SRID=4326;POINT(#longitude# #latitude#)\')) as distance FROM driver_loc WHERE ST_DWithin(location, ST_GeographyFromText(\'SRID=4326;POINT(#longitude# #latitude#)\'), #radius#) limit #limit#;'
};
