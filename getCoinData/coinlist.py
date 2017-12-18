import urllib.request, json
import time

def JSONFromUrl(API_url):
  with urllib.request.urlopen(API_url) as url:
    data = json.loads(url.read().decode())
    return data

def JSONFromFile(file):
  with open(file, 'r') as data_file:
    return (json.load(data_file))

def JSONtoFile(data, file):
  with open(file, 'w') as outfile:
    json.dump(data, outfile)

def sortCoinList(coinList):
  newList = []  
  for coin in coinList:
    order = coinList[coin]["SortOrder"]
    name = coinList[coin]["CoinName"]
    newList.append([coin, int(order), name])
  sortedList = sorted(newList, key=lambda order:order[1])
  return sortedList

def getSnapshotUrl(coinSymbol, currency):
  url = "https://www.cryptocompare.com/api/data/coinsnapshot/?fsym="
  url += coinSymbol
  url += "&tsym="
  url += currency
  return url

def getCoinList():
  url = "https://www.cryptocompare.com/api/data/coinlist/"
  coinList = JSONFromUrl(url)
  return coinList

def getSnapshotList(coinList, max):
  snapshotList = []
  for i in range(0, max):
    snapshotUrl = getSnapshotUrl(coinList[i][0], 'USD')
    snapshot = JSONFromUrl(snapshotUrl)
    snapshot["name"] = coinList[i][2]
    snapshotList.append(snapshot)
  return snapshotList

coinList = JSONFromFile('coinlist.json')
coinList = sortCoinList(coinList)

while True:
  time.sleep(80)
  try:
    print('Getting Snapshot...')
    snapshotList = getSnapshotList(coinList, 20)
    JSONtoFile(snapshotList, 'snapshots.json')
    print('Writing Snapshot...')

    data = JSONFromFile('snapshots.json')
  except:
    continue
  testList = []
  for coin in data:
    try:
      exchangeData = coin["Data"]["AggregatedData"]
      exchangeData['NAME'] = coin["name"]
      exchangeData['SUPPLY'] = coin["Data"]["TotalCoinsMined"]
      testList.append(exchangeData)
    except:
      pass

  JSONtoFile(testList, '../coinTestSet.json')
