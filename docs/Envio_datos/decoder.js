/**
 * Algoritmo de muestra para parsear los datos que envia la estacion de monitoreo de agua
 *
 */

/**
 * Funcion que interpeta el payload enviado por la estacion
 * @param {String} payloadHexStr Payload enviado en hex string
 *
 * @returns datos reportados por la estacion
 */
const parsePayload = function (payloadHexStr) {
  let payload = new Buffer.from(payloadHexStr, "hex");
  if (payload.readUint8(0) != 0x05) {
    throw "Report ID incorrecto";
  }

  const batteryVoltage = payload.readUint8(1) / 10 + 10;
  const initialTimestamp = payload.readUInt32BE(2);

  const dataOffset = 1 + 1 + 4; // largos de: reportID, bateria, timestamp
  const timestampStep = 3600 * 2; // segundos entre mediciones
  const sampleSize = 10; // cantidad de bytes en una muestra (5 sensores con 2 bytes cada uno)

  let samples = [];
  for (let i = 0; i < 4; i++) {
    const sample = {
      timestamp: initialTimestamp - i * timestampStep,
      oxigeno: payload.readUInt16BE(dataOffset + i * sampleSize) / 10,
      conduct: payload.readUInt16BE(dataOffset + i * sampleSize + 2) / 1000,
      temp: payload.readUInt16BE(dataOffset + i * sampleSize + 4) / 10,
      ph: payload.readUInt16BE(dataOffset + i * sampleSize + 6) / 10,
      turbidez: payload.readUInt16BE(dataOffset + i * sampleSize + 8),
    };
    samples.push(sample);
  }

  let OBS501StatusRaw = payload.readUInt16BE(46);
  let OBS501Status = {
    maintenanceRequired: OBS501StatusRaw >= 0x8000,
    motorCurrent: OBS501StatusRaw & 0x7fff,
  };

  let panelTempMin = payload.readUInt16BE(48) / 10 - 100;

  return {
    Status: {
      timestamp: initialTimestamp,
      batteryVoltage: batteryVoltage,
      OBS501Status: OBS501Status,
      panelTempMin: panelTempMin,
    },
    samples: samples,
  };
};

/*****************************************************************/

const payloadHexStr =
  "051762393bb000430000000000510008004300000000005100050043000000000051000500430000000000510005010403D6";
let parsedPayload;
try {
  parsedPayload = parsePayload(payloadHexStr);
} catch (error) {
  console.log(error);
}
console.log(parsedPayload);
