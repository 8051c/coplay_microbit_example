bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Dollar), function () {
    bleReceivedValue = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Dollar))
    recv_process(bleReceivedValue)
})
bluetooth.onBluetoothConnected(function () {
    music.setVolume(255)
    music.ringTone(988)
    basic.pause(100)
    music.setVolume(0)
    music.stopAllSounds()
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    music.setVolume(255)
    music.ringTone(262)
    basic.pause(100)
    music.setVolume(0)
    music.stopAllSounds()
    basic.showIcon(IconNames.Heart)
})
function driveMotors (m1a: number, m1b: number, m2a: number, m2b: number) {
	
}
function recv_process (received_data: string) {
    if (received_data != null) {
        executeMotion(received_data, defaultValue)
    }
}
function executeMotion (key: string, value: number) {
    if (key == "N") {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
    } else if (key == "S") {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 50)
    } else if (key == "W") {
    	
    } else if (key == "E") {
    	
    } else if (key == "CW") {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 50)
    } else if (key == "CCW") {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 50)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
    } else if (key == "NCCW") {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 25)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
    } else if (key == "NCW") {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 25)
    } else if (key == "SCW") {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 25)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 50)
    } else if (key == "SCCW") {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 50)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 25)
    } else if (key == "NW") {
        driveMotors(value * 0, value * 1, value * 0, value * -1)
    } else if (key == "NE") {
        driveMotors(value * -1, value * 0, value * 1, value * 0)
    } else if (key == "SW") {
        driveMotors(value * 1, value * 0, value * -1, value * 0)
    } else if (key == "SE") {
        driveMotors(value * 0, value * -1, value * 0, value * 1)
    } else if (key == "STOP") {
        maqueen.motorStop(maqueen.Motors.All)
        robotbit.MotorStopAll()
    } else if (key == "Z") {
        basic.showIcon(IconNames.Tortoise)
        music.setVolume(255)
        music.play(music.stringPlayable("E B C5 A B G A F ", 220), music.PlaybackMode.UntilDone)
        basic.showIcon(IconNames.Yes)
        music.play(music.createSoundExpression(
        WaveShape.Sine,
        5000,
        0,
        255,
        0,
        3793,
        SoundExpressionEffect.Vibrato,
        InterpolationCurve.Curve
        ), music.PlaybackMode.UntilDone)
        maqueen.motorStop(maqueen.Motors.All)
    } else {
        maqueen.motorStop(maqueen.Motors.All)
    }
}
let bleReceivedValue = ""
let defaultValue = 0
bluetooth.startUartService()
defaultValue = 255
robotbit.MotorStopAll()
basic.showIcon(IconNames.No)
