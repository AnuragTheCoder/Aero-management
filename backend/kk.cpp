#include <bits/stdc++.h>
using namespace std;
int f(int i, int j, bool isTrue, string exp)
{
    if (i > j)
    {
        return 0;
    }
    if (i == j)
    {
        if (isTrue)
        {
            return exp[i] == true;
        }
        else
        {
            return exp[i] == false;
        }
    }
    int ways = 0;
    for (int ind = i + 1; ind <= j - 1; ind += 2)
    {
        int LT = f(i, ind - 1, 1, exp);
        int LF = f(i, ind - 1, 0, exp);
        int RT = f(ind + 1, j, 1, exp);
        int RF = f(ind + 1, j, 0, exp);

        if (exp[ind] == '&')
        {
            ways += LT * RT;
        }
        if (exp[ind] == '|')
        {
            ways += LT * RT + LF * RT + LT * RF;
        }
        if (exp[ind] == '^')
        {
            ways += LT * RF + RT * LF;
        }
    }
    return ways;
}

int evaluateExp(string &exp)
{
    int n = exp.length();
    return f(0, n - 1, 1, exp);
}
int main()
{
    string str;
    cin >> str;
    int ans = 0;
    ans = evaluateExp(str);
    cout << ans << endl;
}