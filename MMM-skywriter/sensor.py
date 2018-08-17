#!/usr/bin/env python
import skywriter
import signal
import sys

some_value = 5000

# @skywriter.move()
# def move(x, y, z):
#  print('sensed')
#  sys.stdout.flush()

@skywriter.flick()
def flick(start,finish):
  if(start == 'west' and finish == 'east'):
      print('right')
  elif(start == 'east' and finish =='west'):
      print('left')
  elif(start == 'south' and finish == 'north'):
      print('up')
  else:
      print('down')
  sys.stdout.flush()

# @skywriter.airwheel()
# def spinny(delta):
#   global some_value
#   some_value += delta
#   if some_value < 0:
#   	some_value = 0
#   if some_value > 10000:
#     some_value = 10000
#   print('Airwheel:', some_value/100)
#   sys.stdout.flush()
#
# @skywriter.double_tap()
# def doubletap(position):
#   print('Double tap!', position)
#   sys.stdout.flush()
#
# @skywriter.tap()
# def tap(position):
#   print('Tap!', position)
#   sys.stdout.flush()
#
# @skywriter.touch()
# def touch(position):
#   print('Touch!', position)
#   sys.stdout.flush()

signal.pause()
