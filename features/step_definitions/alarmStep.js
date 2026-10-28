import { Given, When, Then } from '@wdio/cucumber-framework';
import AlarmPage from '../../pageObjects/alarmPage.js';
const assert = require('assert');

Given('Estoy en la pestaña de alarmas', async () => {
    await AlarmPage.openAlarmTab();
});

When('Creo una alarma a las {string} horas y {string} minutos', async (hora, minuto) => {
    await AlarmPage.createAlarm(hora, minuto);
});

When('Cancelo la creación de una alarma a las {string} horas y {string} minutos', async (hora, minuto) => {
    await AlarmPage.cancelAlarm(hora, minuto);
});

Then('La alarma a las {string}:{string} debería estar visible', async (hora, minuto) => {
    const tiempo = `${hora}:${minuto}`;
    const estaVisible = await AlarmPage.isAlarmDisplayed(tiempo);
    assert.strictEqual(estaVisible, true, `La alarma a las ${tiempo} no está visible`);
});

When('Elimino la alarma a las {string}:{string}', async (hora, minuto) => {
    const tiempo = `${hora}:${minuto}`;
    await AlarmPage.deleteAlarm(tiempo, 3);
});

Then('La alarma a las {string}:{string} no debería existir', async (hora, minuto) => {
    const tiempo = `${hora}:${minuto}`;
    let existe = true;
    try {
        existe = await AlarmPage.isAlarmDisplayed(tiempo);
    } catch (err) {
        // Si no existe, isAlarmDisplayed lanza un error de timeout
        existe = false;
    }
    assert.strictEqual(existe, false, `La alarma a las ${tiempo} todavía existe`);
});
