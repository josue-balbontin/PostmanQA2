class AlarmPage {
  
  // Selectores universales (compatibles con Google DeskClock y AOSP DeskClock)
  get alarmTab() { 
    return $('android=new UiSelector().resourceIdMatches(".*:id/(navigation_bar_item_icon_container|alarm)")'); 
  }
  
  get addButton() { 
    return $('android=new UiSelector().resourceIdMatches(".*:id/fab")'); 
  }

  get okBtn() { 
    return $('android=new UiSelector().resourceIdMatches(".*:id/(material_timepicker_ok_button|button1|ok)")'); 
  }

  get cancelBtn() { 
    return $('android=new UiSelector().resourceIdMatches(".*:id/(material_timepicker_cancel_button|button2|cancel)")'); 
  }

  hourElement(hour) { 
    const h = parseInt(hour, 10).toString();
    return $(`android=new UiSelector().descriptionMatches("^0?${h}$")`);
  }

  minuteElement(minute) { 
    const m = parseInt(minute, 10).toString();
    return $(`android=new UiSelector().descriptionMatches("^0?${m}$")`);
  }

  alarmWithTime(time) {
    return $(`android=new UiSelector().textContains("${time}")`);
  }

  expandAlarm(position) {
    return $(`android=new UiSelector().resourceIdMatches(".*:id/(clock_switch_flow|arrow|expand_area|alarms_recycler_view)")`);
  }

  deleteBtn() {
    return $('android=new UiSelector().resourceIdMatches(".*:id/(delete_button|delete)")');
  }

  // Métodos de acción
  async openAlarmTab() {
    try {
      let tab = await $('android=new UiSelector().descriptionMatches("(?i)alarm.*")');
      if (!await tab.isExisting()) {
        tab = await $('android=new UiSelector().textMatches("(?i)alarm.*")');
      }
      if (await tab.isExisting()) {
        await tab.click();
        await browser.pause(1000);
      }
    } catch (e) {
      console.log('Error opening alarm tab:', e.message);
    }
  }

  async createAlarm(hour, minute) {
    await this.addButton.waitForDisplayed({ timeout: 10000 });
    await this.addButton.click();
    await browser.pause(1500);

    const hElem = this.hourElement(hour);
    if (await hElem.isExisting()) {
      await hElem.click();
      await browser.pause(1000);
    } else {
      const hText = await $(`android=new UiSelector().text("${hour}")`);
      if (await hText.isExisting()) {
        await hText.click();
        await browser.pause(1000);
      }
    }

    const mElem = this.minuteElement(minute);
    if (await mElem.isExisting()) {
      await mElem.click();
      await browser.pause(1000);
    } else {
      const mText = await $(`android=new UiSelector().text("${minute}")`);
      if (await mText.isExisting()) {
        await mText.click();
        await browser.pause(1000);
      }
    }

    const ok = await this.okBtn;
    if (await ok.isExisting()) {
      await ok.click();
    }
    await browser.pause(1500);
    await browser.takeScreenshot();
  }

  async isAlarmDisplayed(time) {
    const alarm = this.alarmWithTime(time);
    await alarm.waitForDisplayed({ timeout: 10000 });
    const displayed = await alarm.isDisplayed();
    await browser.takeScreenshot();
    return displayed;
  }

  async cancelAlarm(hour, minute) {
    await this.addButton.waitForDisplayed({ timeout: 10000 });
    await this.addButton.click();
    await browser.pause(1500);

    const hElem = this.hourElement(hour);
    if (await hElem.isExisting()) {
      await hElem.click();
      await browser.pause(1000);
    } else {
      const hText = await $(`android=new UiSelector().text("${hour}")`);
      if (await hText.isExisting()) {
        await hText.click();
        await browser.pause(1000);
      }
    }

    const mElem = this.minuteElement(minute);
    if (await mElem.isExisting()) {
      await mElem.click();
      await browser.pause(1000);
    } else {
      const mText = await $(`android=new UiSelector().text("${minute}")`);
      if (await mText.isExisting()) {
        await mText.click();
        await browser.pause(1000);
      }
    }

    const cancel = await this.cancelBtn;
    if (await cancel.isExisting()) {
      await cancel.click();
    }
    await browser.pause(1500);
    await browser.takeScreenshot();
  }

  async deleteAlarm(time, position) {
    await browser.takeScreenshot();

    const alarm = await this.alarmWithTime(time);
    await alarm.waitForDisplayed({ timeout: 10000 });

    // En muchas versiones de reloj, hacer click en la alarma la expande
    await alarm.click();
    await browser.pause(1500);

    let delBtn = await $('android=new UiSelector().resourceIdMatches(".*:id/(delete_button|delete)")');
    if (!await delBtn.isExisting()) {
      delBtn = await $('android=new UiSelector().descriptionMatches("(?i)delete.*")');
    }
    if (await delBtn.isExisting()) {
      await delBtn.waitForDisplayed({ timeout: 5000 });
      await delBtn.click();
    }
    await browser.pause(1500);
    await browser.takeScreenshot();
  }

}

module.exports = new AlarmPage();

