const getUserTotalPoints = (
  votes,
  podiumvotes,
  stageResults,
  podiumResults,
  eventId
) => {
  let points = 0;

  const podiumResult = podiumResults.find(
    (e) => e.event.toString() === eventId.toString()
  );
  if (podiumResult) {
    const podiumVote = podiumvotes.find(
      (e) => e.event.toString() === eventId.toString()
    );
    if (podiumVote) {
      if (
        podiumVote.rider1._id.toString() === podiumResult.rider1._id.toString()
      ) {
        //sumo 200pts si acerté el ganador
        points += 200;
      }
      if (
        podiumVote.rider2._id.toString() === podiumResult.rider2._id.toString()
      ) {
        //sumo 100pts si acerté el subcampeón
        points += 100;
      }
      if (
        podiumVote.rider3._id.toString() === podiumResult.rider3._id.toString()
      ) {
        //sumo 90pts si acerté el tercero
        points += 90;
      }
    }
  }

  const eventStageResults = stageResults.filter(
    (e) => e.event.toString() === eventId.toString()
  );
  if (eventStageResults && eventStageResults.length > 0) {
    //Obtengo todos los votos donde salió de primero el que escogí
    const assertsRider1 = votes.filter(
      (v) =>
        eventStageResults.filter(
          (s) =>
            s.stage.toString() === v.stage.toString() &&
            v.rider1._id.toString() === s.rider1._id.toString()
        ).length > 0
    ).length;

    const assertsRider2 = votes.filter(
      (v) =>
        eventStageResults.filter(
          (s) =>
            s.stage.toString() === v.stage.toString() &&
            v.rider2._id.toString() === s.rider2._id.toString()
        ).length > 0
    ).length;

    const assertsRider3 = votes.filter(
      (v) =>
        eventStageResults.filter(
          (s) =>
            s.stage.toString() === v.stage.toString() &&
            v.rider3._id.toString() === s.rider3._id.toString()
        ).length > 0
    ).length;
    //acumulado de puntos por etapas
    points += assertsRider1 * 50 + assertsRider2 * 20 + assertsRider3 * 10;
  }

  return points;
};

module.exports.getUserTotalPoints = getUserTotalPoints;
