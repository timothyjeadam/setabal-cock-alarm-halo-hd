kitronik_halo_hd.onAlarmTrigger(function () {
    music.playTone(523, music.beat(BeatFraction.Whole))
    music.playTone(392, music.beat(BeatFraction.Whole))
})
input.onButtonPressed(Button.A, function () {
    minuts += 1
})
input.onButtonPressed(Button.AB, function () {
    if (settimemod == true) {
        enternewtime = true
    } else {
        settimemod = true
    }
})
input.onButtonPressed(Button.B, function () {
    minuts += 10
})
let hours = 0
let minuts = 0
let enternewtime = false
let settimemod = false
let haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
settimemod = false
enternewtime = false
kitronik_halo_hd.simpleAlarmSet(kitronik_halo_hd.AlarmType.Repeating, 11, 39, kitronik_halo_hd.AlarmSilence.autoSilence)
basic.forever(function () {
    if (settimemod == true) {
        minuts = kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes)
        hours = kitronik_halo_hd.readTimeParameter(TimeParameter.Hours)
        if (hours >= 12) {
            hours += -12
        }
        while (enternewtime == false) {
            if (minuts > 59) {
                minuts = 0
                hours += 1
                if (hours == 12) {
                    hours = 0
                }
            }
            haloDisplay.clear()
            haloDisplay.setZipLedColor(minuts, kitronik_halo_hd.colors(ZipLedColors.Yellow))
            haloDisplay.setZipLedColor(hours * 1, kitronik_halo_hd.colors(ZipLedColors.Red))
            haloDisplay.show()
            basic.pause(1)
        }
        kitronik_halo_hd.setTime(hours, minuts, 0)
        enternewtime = false
        settimemod = false
    } else {
        haloDisplay.clear()
        haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Hours), kitronik_halo_hd.colors(ZipLedColors.Red))
        haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Seconds), kitronik_halo_hd.colors(ZipLedColors.Green))
        haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Minutes), kitronik_halo_hd.colors(ZipLedColors.Yellow))
        haloDisplay.show()
    }
})
