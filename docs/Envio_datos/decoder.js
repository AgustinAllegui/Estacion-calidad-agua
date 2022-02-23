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
  if (payload.readUint8(0) != 0x04) {
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
    current: OBS501StatusRaw & 0x7fff,
  };

  return {
    battery: {
      voltage: batteryVoltage,
      timestamp: initialTimestamp,
      OBS501Status: OBS501Status,
    },
    samples: samples,
  };
};

/*****************************************************************/

const payloadHexStr =
  "042561f983300003000500fc004d00000003000500df004f00000003000500c9005000000003000500b50051000080FE";
let parsedPayload;
try {
  parsedPayload = parsePayload(payloadHexStr);
} catch (error) {
  console.log(error);
}
console.log(parsedPayload);
