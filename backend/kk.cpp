#include <bits/stdc++.h>
using namespace std;

string intstr(int n)
{
    if (n == 0)
    {
        return "0";
    }
    string str = "";
    while (n > 0)
    {
        int last = n % 10;
        str += last + '0';
        n = n / 10;
    }
    reverse(str.begin(), str.end());
    return str;
}

int toNum(string str)
{
    int cnt = 0;
    for (int i = 0; i < str.length(); i++)
    {
        cnt += cnt * 10 + str[i] - '0';
    }
    return cnt;
}

int main()
{
    int N;
    cin >> N;
    vector<string> v;
    for (int i = 0; i < N; i++)
    {
        int A;
        cin >> A;
        v.push_back(to_string(A));
        // cout << v[v.size() - 1] << endl;
        while (v.size() > 1 && v[v.size() - 1] == v[v.size() - 2])
        {
            string str = v[v.size() - 1];
            v.pop_back();
            v.pop_back();
            int num = stoll(str) + 1;
            v.push_back(to_string(num));
        }
    }
    cout << v.size();
}