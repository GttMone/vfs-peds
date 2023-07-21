const QBCore = exports['qb-core'].GetCoreObject()
const MySQL = require('@overextended/oxmysql').oxmysql;

onNet('QBCore:Server:OnPlayerLoaded', async () => {
    const src = source;
    const citizenId = GetCitizenId(src)
    const model = await MySQL.scalar('SELECT `model` FROM `player_peds` WHERE `citizenid` = ? LIMIT 1', [citizenId]);
    if (!model) return;

    TriggerClientEvent('qb-admin:client:SetModel', src, model);
})

RegisterCommand('savemodel', async (source, args) => {
    if (!QBCore.Functions.HasPermission(source, Config.Permissions.savemodel)) return Notify(source, 'No permission', 'error')
    const [model, id] = args;
    if (!model) return Notify(source, 'Model name is required', 'error');

    const citizenId = GetCitizenId(id || source);
    if (!citizenId) return Notify(source, 'Player not online', 'error');
    await MySQL.prepare('INSERT INTO player_peds (citizenid, model) VALUES (?, ?) ON DUPLICATE KEY UPDATE model = VALUES(model)', [citizenId, model]);
    Notify(source, 'Model saved', 'success');
})

RegisterCommand('deletemodel', async (source, args) => {
    if (!QBCore.Functions.HasPermission(source, Config.Permissions.deletemodel)) return Notify(source, 'No permission', 'error');
    const id = args[0];
    const citizenId = GetCitizenId(id || source);
    if (!citizenId) return Notify(source, 'Player not online', 'error');
    await MySQL.update('DELETE FROM player_peds WHERE citizenid = ?', [citizenId])
    Notify(source, 'Model deleted', 'primary');
})

RegisterCommand('loadmodel', async (source) => {
    if (Config.Permissions.loadmodel && !QBCore.Functions.HasPermission(source, Config.Permissions.loadmodel)) return Notify(source, 'No permission', 'error');
    const citizenId = GetCitizenId(source)
    const model = await MySQL.scalar('SELECT `model` FROM `player_peds` WHERE `citizenid` = ? LIMIT 1', [citizenId]);
    if (!model) return Notify(source, 'You don\'t have a saved model!', 'error');
    Notify(source, 'Loading model', 'primary')
    TriggerClientEvent('qb-admin:client:SetModel', source, model);
})

function Notify(source, message, type) {
    TriggerClientEvent('QBCore:Notify', source, message, type);
}

function GetCitizenId(source) {
    const player = QBCore.Functions.GetPlayer(parseInt(source));
    if (!player) return false;
    const citizenId = player.PlayerData.citizenid;
    return citizenId
}