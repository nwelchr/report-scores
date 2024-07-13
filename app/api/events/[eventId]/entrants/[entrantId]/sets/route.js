import fetchEntrantSets from "app/queries/fetchEntrantSets";

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

    const transformedSets = sets.entrant.paginatedSets.nodes
      .map((set) => {
        let winnerScore, loserScore, winner, loser;
        const slots = set.slots || [];
        const entrantSlot = slots.find(
          (slot) => slot?.entrant?.id === parseInt(entrantId)
        );
        const opponentSlot = slots.find(
          (slot) => slot?.entrant?.id !== parseInt(entrantId)
        );

        if (!entrantSlot || !opponentSlot) {
          return null; // or handle the missing slot case differently if needed
        }

        const isEntrantWinner = set.winnerId === parseInt(entrantId);
        const opponent = opponentSlot.entrant;

        if (set.displayScore) {
          if (set.displayScore === "DQ") {
            winnerScore = "W";
            loserScore = "DQ";
            winner = isEntrantWinner ? sets.entrant.name : opponent.name;
            loser = isEntrantWinner ? opponent.name : sets.entrant.name;
          } else if (
            set.displayScore.includes("W") ||
            set.displayScore.includes("L")
          ) {
            winnerScore = "W";
            loserScore = "L";
            winner = isEntrantWinner ? sets.entrant.name : opponent.name;
            loser = isEntrantWinner ? opponent.name : sets.entrant.name;
          } else {
            const [winnerPart, loserPart] = set.displayScore.split(" - ");
            winnerScore = parseInt(winnerPart.split(" ").pop());
            winner = winnerPart.slice(0, winnerPart.lastIndexOf(" "));
            loserScore = parseInt(loserPart.split(" ").pop());
            loser = loserPart.slice(0, loserPart.lastIndexOf(" "));
          }
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
            id: opponent?.id || null,
            name: opponent?.name || "Unknown",
            seed: opponent?.seeds?.[0]?.seedNum || "N/A",
          },
          entrantScore,
          opponentScore,
          state: stateMapping[set.state],
          winnerId: set.winnerId,
        };
      })
      .filter(Boolean);

    const entrantSlot = sets.entrant.paginatedSets.nodes[0].slots.find(
      (slot) => slot?.entrant?.id === parseInt(entrantId)
    );

    const responseData = {
      entrant: {
        id: sets.entrant.id,
        name: sets.entrant.name,
        seed: entrantSlot?.entrant?.seeds[0]?.seedNum || "N/A",
      },
      pageInfo: {
        total: sets.entrant.paginatedSets.pageInfo.total,
        totalPages: sets.entrant.paginatedSets.pageInfo.totalPages,
      },
      sets: transformedSets,
    };

    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch entrant sets" }),
      { status: 500 }
    );
  }
}
