#include <iostream>
#include <queue>
#include <map>
#include <bits/stdc++.h>
using namespace std;

int f(int ind, int display, int n)
{

    if (n == 0)
    {
        return 0;
    }
    int notTake = f(ind + 1, display, n);
    int take = 1e9;
    if (ind < 10)
    {
        if (n >= display * 10 + ind)
        {
            int num = display * 10 + ind;

            take = 1 + f(ind + 1, num, n - num);
        }
    }
    if (ind == 10)
    {
        if (n > display * 100)
        {
            int num = display * 100;

            take = 1 + f(ind + 1, num, n - num);
        }
    }
    return min(take, notTake);
}

int main()
{
    // cout << f(10, 0, 60004) << "hhjb" << endl;
    string s;
    cin >> s;
    int len = s.length();

    int cnt = 0;
    long long int num = 0;
    for (int i = 0; i < s.length(); i++)
    {
        if (i + 1 < len && s[i] == '0' && s[i + 1] == '0')
        {
            i++;
            // num = num * 100;
            cnt++;
        }
        else
        {
            int digit = s[i] - '0';
            // num = num * 10 + digit;
            cnt++;
        }
    }
    cout << cnt << endl;
}
