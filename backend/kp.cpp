#include <iostream>
#include <vector>
#include <bitset>

using namespace std;

// Helper function to count the number of set bits in a number
int countSetBits(int num)
{
    return __builtin_popcount(num);
}

// Function to count the number of triplets with an even number of set bits
int numberOfTriplets(int input1[], int input2, int input3[], int input4, int input5[], int input6)
{
    vector<int> A(input1, input1 + input2);
    vector<int> B(input3, input3 + input4);
    vector<int> C(input5, input5 + input6);

    int count = 0;
    for (int a : A)
    {
        for (int b : B)
        {
            for (int c : C)
            {
                int xorResult = a ^ b ^ c;
                int setBits = countSetBits(xorResult);
                if (setBits % 2 == 0)
                {
                    count += 1;
                }
            }
        }
    }
    return count;
}

int main()
{
    // Example usage
    int A[] = {1, 2};
    int B[] = {3};
    int C[] = {2, 3};
    int nA = 2, nB = 1, nC = 2;

    int result = numberOfTriplets(A, nA, B, nB, C, nC);
    cout << "Output: " << result << endl; // Output: 2

    return 0;
}
