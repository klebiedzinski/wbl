export default function sort_basketball_league(teams,games) {
    // Sort teams by the following criteria, in order of precedence:
    // 1. Winning percentage
    // 2. Point difference
    // 3. Head-to-head result (if applicable)
    // 4. Wins (descending)
    return teams.sort((a, b) => {
        // Criterion 0: Wins
        if (a.wins !== b.wins){
            return (a.wins < b.wins) ? 1 : -1;
        }
        // Criterion 1: Winning percentage
        const aWinningPercentage = a.wins / (a.wins + a.losses);
        const bWinningPercentage = b.wins / (b.wins + b.losses);
        if (aWinningPercentage !== bWinningPercentage) {
            return aWinningPercentage < bWinningPercentage ? 1 : -1;
        }

        
        
        // Criterion 2: Head-to-head result
        const head_to_head_game = games.find(game => {
            if (game.team1_id === a._id && game.team2_id === b._id)  {
                return {
                    a_score: game.team1Score,
                    b_score: game.team2Score
                };
            }
            if (game.team1_id === b._id && game.team2_id === a._id)  {
                return {
                    a_score: game.team2Score,
                    b_score: game.team1Score
                };
            }
            return false;
        });
        if (head_to_head_game !== undefined) {
            if(head_to_head_game.a_score !== head_to_head_game.b_score) {
                return head_to_head_game.a_score < head_to_head_game.b_score ? 1 : -1;
            }
        }
        

        // Criterion 3: Point difference
        const aPointDifference = a.points_made - a.points_lost;
        const bPointDifference = b.points_made - b.points_lost;
        if (aPointDifference !== bPointDifference) {
            return aPointDifference < bPointDifference ? 1 : -1;
        }
        
       
    });
}

