/**
 * Created by user on 12/7/16.
 */
function parseQuote(response)
{
    document.getElementById("quote").innerHTML = response.quoteText;
    document.getElementById("author").innerHTML = response.quoteAuthor;
}