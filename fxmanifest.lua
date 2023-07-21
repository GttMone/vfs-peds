fx_version 'cerulean'
game 'gta5'

author 'Vito Gos <davidgospodinov10@gmail.com> @.vitoo.'
description 'Save and load custom peds for each character'
version '1.0.0'

server_scripts {
    'config.js',
    'server/server.js',
    'server/sql.js'
}

client_script 'client/client.js'

dependencies {
    'oxmysql'
}