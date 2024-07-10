import fetchEntrantSets from "@/app/queries/fetchEntrantSets";

const stateMapping = {
  1: "NOT_STARTED",
  2: "IN_PROGRESS",
  3: "COMPLETE",
};

export async function GET(req, { params }) {
  const { eventId, entrantId } = params;

  if (!eventId || !entrantId) {
    return new Response(
      JSON.stringify({ error: "Missing eventId or entrantId" }),
      {
        status: 400,
      }
    );
  }

  try {
    const sets = await fetchEntrantSets(eventId, entrantId);

    if (!sets) {
      throw new Error("No sets found");
    }

    const transformedSets = sets.entrant.paginatedSets.nodes.map((set) => {
      let winnerScore, loserScore, winner, loser;
      const isEntrantWinner = set.winnerId === parseInt(entrantId);
      const opponent = set.slots.find(
        (slot) => slot.entrant.id !== parseInt(entrantId)
      ).entrant;

      if (set.displayScore) {
        const [winnerPart, loserPart] = set.displayScore.split(" - ");
        winnerScore = parseInt(winnerPart.split(" ").pop());
        winner = winnerPart.slice(0, winnerPart.lastIndexOf(" "));
        loserScore = parseInt(loserPart.split(" ").pop());
        loser = loserPart.slice(0, loserPart.lastIndexOf(" "));
      } else {
        winnerScore = null;
        loserScore = null;
        winner = null;
        loser = null;
      }

      const entrantScore = isEntrantWinner ? winnerScore : loserScore;
      const opponentScore = isEntrantWinner ? loserScore : winnerScore;

      return {
        id: set.id,
        fullRoundText: set.fullRoundText,
        opponent: {
          id: opponent.id,
          name: opponent.name,
          seed: opponent.seeds[0].seedNum,
        },
        entrantScore,
        opponentScore,
        state: stateMapping[set.state],
        winnerId: set.winnerId,
      };
    });

    const responseData = {
      entrant: {
        id: sets.entrant.id,
        name: sets.entrant.name,
        seed: sets.entrant.paginatedSets.nodes[0].slots.find(
          (slot) => slot.entrant.id === parseInt(entrantId)
        ).entrant.seeds[0].seedNum,
      },
      pageInfo: {
        total: sets.entrant.paginatedSets.pageInfo.total,
        totalPages: sets.entrant.paginatedSets.pageInfo.totalPages,
      },
      sets: transformedSets,
    };

    console.log(JSON.stringify(sets));
    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch entrant sets" }),
      { status: 500 }
    );
  }
}
